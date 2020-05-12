const path = require('path');
const getDirname = require('../util//getDirname');
const asyncWrapper = require('../util/asyncWrapper')
const { 
  signUp,
  signIn
} = require('../models/authApi');


exports.getSignUp = (req, res, next) => { 
  res.render(path.join(getDirname(), 'views', 'auth', 'signup'));
}

exports.postSignUp = asyncWrapper(async (req, res) => { 
  const returnedUser = await signUp(req.body);
  res.cookie('user', returnedUser);
  res.redirect('/');
});

exports.getSignIn = (req, res, next) => { 
  res.render(path.join(getDirname(), 'views', 'auth', 'signin'));
}

exports.postSignIn = asyncWrapper(async(req, res) => { 
  const returnedUser = await signIn(req.body);
  res.cookie('user', returnedUser);
  res.redirect('/');
})

exports.getUser = (req, res, next) => { 
  const { user } = req.cookies.user;
  const tempDate = new Date(user.createdAt);
  user.createdAt = tempDate.toDateString()
  res.render(path.join(getDirname(), 'views', 'auth', 'user'), { user });
}

exports.logout = (req, res) => { 
  res.clearCookie('user');
  res.redirect('/');
}