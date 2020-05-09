/*
  @desc adds to every view two boolean values
*/
module.exports = (req, res, next) => { 
  let womens, genderSelected;
  if(req.originalUrl !== '/favicon.ico') { 
    let temp = req.originalUrl;
    if(temp.substr(-1) === '/') temp = temp.substr(0, temp.length - 1); //removes the final slash from the url string

    const urlArr = temp.split('/');    // creates an array from the url

    if(urlArr[urlArr.length - 1] === '' || urlArr[urlArr.length - 1] === 'products' || urlArr[urlArr.length - 1] === 'categories') genderSelected = true;
    urlArr.forEach(param => { if(param.includes('womens')) womens = true });
  }
  res.locals.womens = womens;
  res.locals.genderSelected = genderSelected;
  next();
}