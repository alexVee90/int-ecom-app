/*
  @desc error middleware, adds a default statuscode and message if these are undefined. 
  @returns error ejs template
*/

module.exports = (err, req, res, next) => { 
  if(!err.status) { 
    err.status = 500;
    err.msg = 'Internal Server Error';
  }
  if(err.response.data === 'Product Not Found') { 
    res.render('pnf')
  } else {
    res.render('error', { err });
  }
}