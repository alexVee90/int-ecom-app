const asyncWrapper = require('../util/asyncWrapper');
const getDirname             = require('../util/getDirname');
const path                   = require('path');
// const { getChildCategories, getAllCategories, getSingleCategory } = require('../models/dbApi');

exports.getProducts = asyncWrapper( async(req, res) => { 
  res.render(path.join(getDirname(), 'views', 'products', 'product-list'));
})