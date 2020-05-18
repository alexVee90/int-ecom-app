const express        = require('express');
const Sentry         = require('@sentry/node');
const dotenv         = require('dotenv')
const path           = require('path');
const cookieParser   = require('cookie-parser');
const methodOverride = require('method-override');

const homeRoute               = require('./routes/home');
const categoriesRoute         = require('./routes/categories');
const productsRoute           = require('./routes/products');
const authRoute               = require('./routes/auth');
const notFoundHandler         = require('./util/notFoundHandler');
const errorHandler            = require('./util/errorHandler');
const breadcrumbHandler       = require('./util/breadcrumbHandler');
const navtagsHandler          = require('./util/navtagsHandler');
const isAuthenthicatedHandler = require('./util/isAuthenthicatedHandler');

const app     = express();

//configure express
app.set('view engine', 'ejs'); // @desc set ejs as default view engine
dotenv.config(); // @desc load env variables
Sentry.init({ dsn: process.env.SENTRY_DSN }); // initialize sentry



//middleware
app.use(Sentry.Handlers.requestHandler());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public', 'images'))); // serve static files from public route
app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public route
app.use(Sentry.Handlers.errorHandler());
app.use(breadcrumbHandler);
app.use(navtagsHandler);
app.use(cookieParser());
app.use(isAuthenthicatedHandler);
app.use(methodOverride('_method')); 

//routes
app.use('/', homeRoute);
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);
app.use('/auth', authRoute);
app.use(errorHandler);
app.use('*', notFoundHandler);

const PORT = process.env.PORT || 4001;

//initialize server
app.listen(PORT, () => { 
  process.stdout.write(`running on port ${PORT} in ${process.env.NODE_ENV} mode \n`);
});