/*
  @desc adds to every view two boolean values
*/
module.exports = (req, res, next) => { 
  let womens, genderSelected;
  if(req.originalUrl !== '/favicon.ico') { 
    const urlArr = req.originalUrl.split('/');
    if(urlArr[1] === '' || urlArr[1] === 'products') genderSelected = true;
    urlArr.forEach(param => { if(param.includes('womens')) womens = true });
  }
  res.locals.womens = womens;
  res.locals.genderSelected = genderSelected;
  next();
}