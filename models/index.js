const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alex:alex@cluster0-kpg8o.mongodb.net/int-ecom-app?retryWrites=true&w=majority', 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, () => console.log('MongoDB connected'));

  module.exports.Category = require('./Category');