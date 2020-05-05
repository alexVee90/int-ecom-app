const express = require('express');
const Sentry  = require('@sentry/node');
const dotenv  = require('dotenv')
const path    = require('path');

const app     = express();

//configure express
app.set('view engine', 'ejs'); // @desc set ejs as default view engine
dotenv.config(); // @desc load env variables
Sentry.init({ dsn: process.env.SENTRY_DSN }); // initialize sentry

const PORT    = process.env.PORT || 4001;

//middleware
app.use(Sentry.Handlers.requestHandler());
app.use('/public', express.static(path.join(__dirname, 'public'))); // serve static files from public route
app.use(Sentry.Handlers.errorHandler());

// @desc     test-route
// @access   public
app.get('/', (req, res) => { 
  res.status(200).render('home', { route: req.url });
})

//initialize server
app.listen(PORT, () => { 
  process.stdout.write(`running on port ${PORT} in ${process.env.NODE_ENV} mode \n`);
});