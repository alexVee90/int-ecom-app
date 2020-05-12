
module.exports = (req, res, next) => { 
  let isAuthenthicated = false;
  if(req.cookies.user) isAuthenthicated = true;

  res.locals.isAuthenthicated = isAuthenthicated;
  next();
};