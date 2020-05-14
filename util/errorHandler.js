/*
  @desc error middleware, adds a default statuscode and message if these are undefined. 
  @returns error ejs template
*/

module.exports = (err, req, res, next) => { 
  if(!err.status) { 
    err.status = 500;
    err.msg = 'Internal Server Error';
  }
  if(err.isAxiosError) { 
    err.status = err.response.status;
    err.msg  = err.response.data.error
  } 
  console.log('----------------------------------------------------------------------');
  console.log(err);
  console.log('----------------------------------------------------------------------');
  res.render('error', { err });
}