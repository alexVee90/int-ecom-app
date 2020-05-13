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

exports.getUser = (req, res, next) => { 
  let userInfo = {}
  if(req.cookies.accountInfo) {
    let { user } = req.cookies.accountInfo;
    userInfo = user;
    const tempDate = new Date(user.createdAt);
    userInfo.createdAt = tempDate.toDateString()
  }
  res.render(path.join(getDirname(), 'views', 'auth', 'user'), { user: userInfo });
}

exports.logout = (req, res) => { 
  res.clearCookie('accountInfo');
  res.redirect('/');
}