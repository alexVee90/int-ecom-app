
module.exports = (req, res, next) => { 
  if(!req.cookies.accountInfo) res.redirect('/auth/user');
  next();
}