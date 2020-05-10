/*
  @desc sets a variable named breadcrumbs in every view
  @usage get invoked on every request
*/
module.exports = (req, res, next) => { 
  let routes = [];
  if(req.originalUrl !== '/favicon.ico') {
    let urlArr = req.originalUrl.split('/').slice(1); // @returns ex: ['', 'home', 'category'].slice(1)

    const regex = /\?page\=[0-9][0-9]?/;
    
    /*
      tests if the last parameter in the route is the page query parameter and removes it
    */
    if(regex.test(urlArr[urlArr.length - 1])) {
      urlArr = urlArr.slice(0, urlArr.length - 1)
    }

    routes = urlArr.map((r, i, arr) => {
      return { name: r, route: arr.slice(0, i + 1).join('/')}  //@returns an array of objects with name of the route and the route;
    })
  }
  res.locals.breadcrumbs = routes;
  next();
}