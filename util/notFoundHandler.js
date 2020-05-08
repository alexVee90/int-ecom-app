/*
  @desc catches all oother unset routes
  @returns the not-found ejs template.
*/

module.exports = (req, res) => { 
  res.render('not-found');
}