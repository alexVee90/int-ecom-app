const path = require('path');
const getDirname = require('../util//getDirname');
const asyncWrapper = require('../util/asyncWrapper')
const { 
  signUp,
  signIn,
  addToWishlist,
  getWishlistFromDB,
  deleteWishlistItem,
  changeWishlistItemQuantity
} = require('../models/authApi');


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

  const wishlist = await getWishlistFromDB(req.cookies.accountInfo.token);
  const itemAlreadyExists = wishlist.items.find(item => item.variant.product_id === req.body.variantId );

  itemAlreadyExists 
    ? await changeWishlistItemQuantity({ productId: req.body.productId, variantId: req.body.variantId, quantity: itemAlreadyExists.quantity + 1 }, req.cookies.accountInfo.token) 
    : await addToWishlist(req.body, req.cookies.accountInfo.token)

  res.redirect('/auth/wishlist');
});

exports.deleteWishlist = asyncWrapper(async (req, res) => { 

  const wishlist = await getWishlistFromDB(req.cookies.accountInfo.token);
  const itemAlreadyExists = wishlist.items.find(item => item.variant.product_id === req.body.variantId );

  itemAlreadyExists.quantity > 1 
    ? await changeWishlistItemQuantity({ productId: req.body.productId, variantId: req.body.variantId, quantity: itemAlreadyExists.quantity - 1 }, req.cookies.accountInfo.token) 
    : await deleteWishlistItem(req.body, req.cookies.accountInfo.token);

  
  res.redirect('/auth/wishlist');
})

exports.logout = (req, res) => { 
  res.clearCookie('accountInfo');
  res.redirect('/');
}