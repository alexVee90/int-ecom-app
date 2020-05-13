
module.exports = (req, res, next) => { 
  !req.cookies.accountInfo ? res.redirect('/auth/user') : next();

}