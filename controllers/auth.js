const path = require('path');
const getDirname = require('../util//getDirname');
const asyncWrapper = require('../util/asyncWrapper')
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
const stripeMiddleware = require('../util/stripeMiddleware');


exports.getSignUp = (req, res, next) => { 
  res.render(path.join(getDirname(), 'views', 'auth', 'signup'));
}

exports.postSignUp = asyncWrapper(async (req, res) => { 
  const accountInfo = await signUp(req.body);
  res.cookie('accountInfo', accountInfo);
  res.redirect('/');
});

exports.getSignIn = (req, res, next) => { 
  res.render(path.join(getDirname(), 'views', 'auth', 'signin'));
}

exports.postSignIn = asyncWrapper(async(req, res) => { 
  const accountInfo = await signIn(req.body);
  res.cookie('accountInfo', accountInfo);
  res.redirect('/');
})

exports.getUser = (req, res) => { 
  let userInfo = {}
  if(req.cookies.accountInfo) {
    let { user } = req.cookies.accountInfo;
    userInfo = user;
    const tempDate = new Date(user.createdAt);
    userInfo.createdAt = tempDate.toDateString()
  }
  res.render(path.join(getDirname(), 'views', 'auth', 'user'), { user: userInfo });
}


// WISHLIST Controllers 

exports.getWishlist = asyncWrapper(async (req, res) => { 
  const response = await getWishlistFromDB(req.cookies.accountInfo.token);
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

  const wishlist = await getWishlistFromDB(req.cookies.accountInfo.token);
  const itemAlreadyExists = wishlist.items.find(item => item.variant.product_id === req.body.variantId );

  itemAlreadyExists.quantity > 1 
    ? await changeWishlistItemQuantity({ productId: req.body.productId, variantId: req.body.variantId, quantity: itemAlreadyExists.quantity - 1 }, req.cookies.accountInfo.token) 
    : await deleteWishlistItem(req.body, req.cookies.accountInfo.token);

  
  res.redirect('/auth/wishlist');
});


//CART Controllers 

exports.getCart = asyncWrapper(async(req, res) => { 
  const { token } = req.cookies.accountInfo;

  const cart = await getCartFromDB(token);
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


//ORDERS Controllers 

exports.getOrders = asyncWrapper(async(req, res) => {
  const { token } = req.cookies.accountInfo;
  const orders = await getOrdersFromDB(token);

  res.render(path.join(getDirname(), 'views', 'auth', 'orders'), { orders });
});

exports.postOrders = asyncWrapper(async(req, res) => { 
  const { token } = req.cookies.accountInfo;
  const { session_id } = req.query;
  const dataToBeSent = {};

  const { items } = await getCartFromDB(token);
  dataToBeSent.items = items;
  dataToBeSent.paymentId = session_id;
  
  await createOrder(dataToBeSent, token);
  
  res.redirect('/auth/orders')
});


//LOGOUT Controller 

exports.logout = (req, res) => { 
  res.clearCookie('accountInfo');
  res.redirect('/');
}