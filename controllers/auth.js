const fs                 = require('fs');
const { promisify }      = require('util');
const path               = require('path');
const getDirname         = require('../util//getDirname');
const asyncWrapper       = require('../util/asyncWrapper');
const readFile           = promisify(fs.readFile);
const {validationResult} = require('express-validator');


const stripeMiddleware = require('../util/stripeMiddleware');
const transporter      = require('../util/nodemailerMiddleware');
const createOrderPdf   = require('../util/pdfkitMiddleware');
const customError      = require('../util/customError');

const { 
  signUp,
  signIn,
  addToWishlist,
  getWishlistFromDB,
  deleteWishlistItem,
  changeWishlistItemQuantity,
  getCartFromDB,
  addToCart,
  changeCartItemQuantity,
  getOrdersFromDB,
  createOrder,
} = require('../models/authApi');



////////////////////////
//SIGN IN & SIGN UP

exports.getSignUp = (req, res, next) => { 
  res.render(path.join(getDirname(), 'views', 'auth', 'signup'));
}

exports.postSignUp = asyncWrapper(async (req, res) => { 
  //express-validator validation
  const errors = validationResult(req);
  if(!errors.isEmpty()) throw customError(400, 'Invalid login Credentials');
  
  const accountInfo = await signUp(req.body);
  res.cookie('accountInfo', accountInfo);

  await transporter.sendMail({
    from: 'noreply@gmail.com',
    to: accountInfo.user.email,
    subject: 'Welcome',
    html: await readFile(path.join(getDirname(), 'views', 'emails', 'welcome-email.ejs'), 'UTF-8')
});
  
  res.redirect('/');
});

exports.getSignIn = (req, res, next) => { 
  res.render(path.join(getDirname(), 'views', 'auth', 'signin'));
}

exports.postSignIn = asyncWrapper(async(req, res) => { 
  //express-validator validation
  const errors = validationResult(req);
  if(!errors.isEmpty()) throw customError(400, 'Invalid login Credentials');

  const accountInfo = await signIn(req.body);
  res.cookie('accountInfo', accountInfo);

  await transporter.sendMail({
    from: 'noreply@gmail.com',
    to: accountInfo.user.email,
    subject: 'Welcome Back!',
    html: await readFile(path.join(getDirname(), 'views', 'emails', 'welcome-back-email.ejs'), 'UTF-8')
});

  res.redirect('/');
})

exports.getUser = (req, res) => { 
  let userInfo = {};
  if(req.cookies.accountInfo) {
    let { user } = req.cookies.accountInfo;
    userInfo = user;
    const tempDate = new Date(user.createdAt);
    userInfo.createdAt = tempDate.toDateString()
  }
  res.render(path.join(getDirname(), 'views', 'auth', 'user'), { user: userInfo });
}


////////////////////////////////
// WISHLIST Controllers 

exports.getWishlist = asyncWrapper(async (req, res) => { 

  const { user, token } = req.cookies.accountInfo;

  const response = await getWishlistFromDB(token);

  if(user._id !== response.userId) throw customError(401, 'You are not authorized to view this content');

  res.render(path.join(getDirname(), 'views', 'auth', 'wishlist'), { wishlist: response});
})

exports.postWishlist = asyncWrapper(async (req, res) => { 

  await addToWishlist(req.body, req.cookies.accountInfo.token);
  /*
    throws an error if the item is already in the wishlist - no way arround it because returning an empty cart also returns an error
  */
  res.redirect('/auth/wishlist');
});

exports.deleteWishlist = asyncWrapper(async (req, res) => { 

  const { user, token } = req.cookies.accountInfo;

  const wishlist = await getWishlistFromDB(token);

  if(user._id !== wishlist.userId) throw customError(401, 'You are not authorized to view this content');
  
  const itemAlreadyExists = wishlist.items.find(item => item.variant.product_id === req.body.variantId );

  itemAlreadyExists.quantity > 1 
    ? await changeWishlistItemQuantity(
      { 
        productId: req.body.productId, 
        variantId: req.body.variantId, 
        quantity: itemAlreadyExists.quantity - 1 
      }, 
      req.cookies.accountInfo.token) 
    : await deleteWishlistItem(req.body, req.cookies.accountInfo.token);

  
  res.redirect('/auth/wishlist');
});


/////////////////////////////////
//CART Controllers 

exports.getCart = asyncWrapper(async(req, res) => { 
  const { user, token } = req.cookies.accountInfo;

  const cart = await getCartFromDB(token);

  if(user._id !== cart.userId) throw customError(401, 'You are not authorized to view this content');

  const total = cart.items.reduce((acc, i) => acc + (Number(i.variant.price) * Number(i.quantity)), 0);

  const session = await stripeMiddleware(req, cart.items);

  res.render(path.join(getDirname(), 'views', 'auth', 'cart'), { cart, total, session });
});

exports.postCart = asyncWrapper(async(req, res) => { 
  const { token } = req.cookies.accountInfo;
  const { productId, variantId } = req.body;

  await addToCart(req.body, token);
  await changeWishlistItemQuantity({productId, variantId, quantity: 0}, token);

  res.redirect('/auth/cart');
});

exports.deleteCartItem = asyncWrapper(async(req, res) => {
  const { token } = req.cookies.accountInfo;
  const { productId, variantId } = req.body;

  await changeCartItemQuantity({ productId, variantId, quantity: 0}, token);

  res.redirect('/auth/cart');
});


//////////////////////////////////
//ORDERS Controllers 

exports.getOrders = asyncWrapper(async(req, res) => {
  const { user, token } = req.cookies.accountInfo;
  const orders = await getOrdersFromDB(token);

  if(user._id !== orders.userId) throw customError(401, 'You are not authorized to view this content');

  res.render(path.join(getDirname(), 'views', 'auth', 'orders'), { orders });
});

exports.postOrders = asyncWrapper(async(req, res) => { 
  const { token } = req.cookies.accountInfo;
  const { user } = req.cookies.accountInfo;
  const { session_id } = req.query;
  const dataToBeSent = {};

  const { items } = await getCartFromDB(token);
  dataToBeSent.items = items;
  dataToBeSent.paymentId = session_id;
  
  //creates the order in the db
  await createOrder(dataToBeSent, token);
  //creates the pdf in the data file on the server
  createOrderPdf(session_id, user, items);

  res.redirect('/auth/orders')
});


/////////////////////////////////////////
//INVOICE Controller 
exports.getInvoice = (req, res) => { 
  const filePath = `order-${req.params.id}.pdf`
  const file = fs.createReadStream(path.join(getDirname(), 'data', filePath));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline')
  file.pipe(res);
}


/////////////////////////////////////////
//LOGOUT Controller 

exports.logout = (req, res) => { 
  res.clearCookie('accountInfo');
  res.redirect('/');
}