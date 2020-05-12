const express = require('express');
const router = express.Router();
const { 
  logout,
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  getUser,
} = require('../controllers/auth');

router.get('/signup', getSignUp);
router.post('/signup', postSignUp);

router.get('/signin', getSignIn)
router.post('/signin', postSignIn)

router.get('/user', getUser);

router.get('/logout', logout)

module.exports = router;