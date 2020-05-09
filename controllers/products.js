const asyncWrapper = require('../util/asyncWrapper');
const getDirname             = require('../util/getDirname');
const path                   = require('path');
const { getAllProducts, getSingleProduct } = require('../models/dbApi');

exports.getProducts = asyncWrapper( async(req, res) => { 
  const page = req.query.page || 1;
  const products = [...await getAllProducts(page)]
  res.render(
    path.join(getDirname(), 'views', 'products', 'product-list'), 
    { 
      products, 
      hasPreviousPage: page > 1,
      currentPage: Number(page),
      previousPage: Number(page) - 1,
      nextPage: Number(page) + 1
    });
})


exports.getProduct = asyncWrapper(async(req, res) => { 
  const productId = req.params.id;
  const [ product ] = await getSingleProduct(productId);
  res.render(path.join(getDirname(), 'views', 'products', 'product-details'), { product });
})