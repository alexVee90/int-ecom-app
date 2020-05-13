
module.exports = (req, res, next) => { 
  let isAuthenthicated = false;
  if(req.cookies.accountInfo) isAuthenthicated = true;

  res.locals.isAuthenthicated = isAuthenthicated;
  next();
};