const express = require('express');
const Sentry  = require('@sentry/node');
const dotenv  = require('dotenv')
const path    = require('path');

const homeRoute       = require('./routes/home');
const productsRoute   = require('./routes/products');
const notFoundHandler = require('./util/notFoundHandler');
const errorHandler          = require('./util/errorHandler');
const breadcrumbHandler    = require('./util/breadcrumbHandler');

const app     = express();

//configure express
app.set('view engine', 'ejs'); // @desc set ejs as default view engine
dotenv.config(); // @desc load env variables
Sentry.init({ dsn: process.env.SENTRY_DSN }); // initialize sentry

//middleware
app.use(Sentry.Handlers.requestHandler());
app.use(express.static(path.join(__dirname, 'public', 'images'))); // serve static files from public route
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public route
app.use(Sentry.Handlers.errorHandler());
app.use(breadcrumbHandler);

//routes
app.use('/home', homeRoute);
app.use('/subcategories', productsRoute);
app.use(errorHandler);
app.use('*', notFoundHandler);

const PORT = process.env.PORT || 4001;

//initialize server
app.listen(PORT, () => { 
  process.stdout.write(`running on port ${PORT} in ${process.env.NODE_ENV} mode \n`);
});