/*
  @desc adds to every view two boolean values
*/
module.exports = (req, res, next) => { 
  let womens, mens;
  if(req.originalUrl !== '/favicon.ico') { 
    /*
      removes the final slash from req.originalUrl
    */
    let temp = (req.originalUrl.substr(-1) === '/') ? req.originalUrl.substr(0, req.originalUrl.length - 1) : req.originalUrl; 

    const urlArr = temp.split('/');    // creates an array from the url

    const m = /^mens$/;
    const w = /^womens$/;

    urlArr.forEach(param => { if(w.test(param)) womens = true });
    urlArr.forEach(param => { if(m.test(param)) mens = true });
  }
  res.locals.womens = womens;
  res.locals.mens = mens;
  next();
}