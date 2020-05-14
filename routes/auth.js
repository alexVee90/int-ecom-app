const express               = require('express');
const router                = express.Router();
const { 
  logout,
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  getUser,
  getWishlist,
  postWishlist,
  deleteWishlist,
  getCart,
  postCart,
  deleteCartItem
}                           = require('../controllers/auth');
const protectedRouteHandler = require('../util/protectedRouteHandler')

router.get('/', (req, res) => res.redirect('/auth/user'));

router.get('/signup', getSignUp);
router.post('/signup', postSignUp);

router.get('/signin', getSignIn)
router.post('/signin', postSignIn)

router.get('/user', getUser);

router.get('/wishlist', protectedRouteHandler, getWishlist);
router.post('/wishlist', protectedRouteHandler, postWishlist);
router.delete('/wishlist', protectedRouteHandler, deleteWishlist);

router.get('/cart', protectedRouteHandler, getCart);
router.post('/cart', protectedRouteHandler, postCart);
router.delete('/cart', protectedRouteHandler, deleteCartItem);


router.get('/logout', logout)

module.exports = router;