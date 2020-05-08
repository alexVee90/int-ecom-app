/*
  @desc sets a variable named breadcrumbs in every view
  @usage get invoked on every request
*/
module.exports = (req, res, next) => { 
  let routes = [];
  if(req.originalUrl !== '/favicon.ico') {
    urlArr = req.originalUrl.split('/').slice(1); // @returns ex: ['', 'home', 'category'].slice(1)
    routes = urlArr.map((r, i, arr) => {
      return { name: r, route: arr.slice(0, i + 1).join('/')}  //@returns an array of objects with name of the route and the route;
    })
  }
  res.locals.breadcrumbs = routes;
  next();
}