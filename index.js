const express = require('express');
const Sentry = require('@sentry/node');
const dotenv = require('dotenv')

const app = express();
const PORT = process.env.PORT || 4001;

app.set('view engine', 'ejs'); // @desc set ejs as default view engine
dotenv.config(); // @desc load env variables

//middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// @desc     test-route
// @access   public
app.get('/', (req, res) => { 
  res.status(200).json(`you reached path ${req.url}`);
})

// @desc     test-unhandledRejection
app.get('/test', async (req, res) => { 
  await nothing;
  res.send('jibber');
})

const server = app.listen(PORT, () => { 
  process.stdout.write(`running on port ${PORT} in ${process.env.NODE_ENV} mode \n`);
});

process.on('unhandledRejection', (reason) => {
  process.stderr.write(`ERROR ${reason} \n`);
  server.close(() => process.exitCode = 1);
})