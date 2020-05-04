const express = require('express');

//load env vars
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4001;

//middleware
app.set('view engine', 'ejs');

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