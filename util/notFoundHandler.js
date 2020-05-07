/*
  @desc catches all oother unset routes
  @returns the not-found ejs template.
*/

module.exports = (req, res) => { 
  console.log(req.originalUrl)
  res.render('not-found');
}