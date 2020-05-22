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

  console.log('--------------------------------------------------------------------------------------');
  console.log(err);
  console.log('--------------------------------------------------------------------------------------');

  //MONGODB ERROR CHECKS
  if(err.name === 'ValidationError') {
    err.status = 400;
    err.msg = ` The following fields are required: ${Object.keys(err.errors)}`;
    return res.status(err.status).send({ success: false, reason: err.msg, data: null });
  }
  if(err.name === 'CastError') {
    err.status = 400;
    err.msg = err.message;
    return res.status(err.status).send({ success: false, reason: err.msg, data: null });
  }

  res.render('error', { err });
}