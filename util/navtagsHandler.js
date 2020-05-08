/*
  @desc adds to every view two boolean values
*/
module.exports = (req, res, next) => { 
  let mens, womens;
  if(req.originalUrl !== '/favicon.ico') { 
    const urlArr = req.originalUrl.split('/');
    mens = urlArr.includes('mens');
    womens = urlArr.includes('womens');
  }
  res.locals.mens = mens;
  res.locals.womens = womens;
  next();
}