const express               = require('express');
const router                = express.Router();
const protectedRouteHandler = require('../util/protectedRouteHandler')
const { check }             = require('express-validator');

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
  deleteCartItem,
  getOrders,
  postOrders,
  getInvoice
} = require('../controllers/auth');

router.get('/', (req, res) => res.redirect('/auth/user'));

router.get('/signup', getSignUp);
router.post('/signup', [
  check('name').trim().isLength({min: 3}),
  check('email').trim().isEmail(),
  check('password').trim().isLength({min: 3})
], postSignUp);

router.get('/signin', getSignIn)
router.post('/signin', [
  check('email').trim().isEmail(),
  check('password').trim().isLength({min: 3})
], postSignIn)

router.get('/user', getUser);

router.get('/wishlist', protectedRouteHandler, getWishlist);
router.post('/wishlist', protectedRouteHandler, postWishlist);
router.delete('/wishlist', protectedRouteHandler, deleteWishlist);

router.get('/cart', protectedRouteHandler, getCart);
router.post('/cart', protectedRouteHandler, postCart);
router.delete('/cart', protectedRouteHandler, deleteCartItem);

router.get('/orders', protectedRouteHandler, getOrders);
router.get('/orders/success', protectedRouteHandler, postOrders);
router.get('/orders/:id', protectedRouteHandler, getInvoice);


router.get('/logout', logout)

module.exports = router;