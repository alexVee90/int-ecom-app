const express = require('express');
const Sentry  = require('@sentry/node');
const dotenv  = require('dotenv')

const app     = express();
const PORT    = process.env.PORT || 4001;

//configure express
app.set('view engine', 'ejs'); // @desc set ejs as default view engine
dotenv.config(); // @desc load env variables
Sentry.init({ dsn: process.env.SENTRY_DSN }); // initialize sentry

//middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// @desc     test-route
// @access   public
app.get('/', (req, res) => { 
  res.status(200).render('home', { route: req.url });
})

//@desc         test-unhandledRejection
//@test         navigate to route to throw error and test sentry 
//@depracated   will be removed
app.get('/test', async (req, res) => { 
  await nothing;
  res.send('jibber');
})

//initialize server
app.listen(PORT, () => { 
  process.stdout.write(`running on port ${PORT} in ${process.env.NODE_ENV} mode \n`);
});