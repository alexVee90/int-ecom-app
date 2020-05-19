const express = require('express');
const router = express.Router();
const { 
  getProduct,
  getProducts,
  postSearchProducts,
  getSearchProducts
} = require('../controllers/products');

router.get('/', getProducts);

router.get('/search', getSearchProducts);

router.get('/:categoryId', getProducts);
router.get('/:categoryId/:id', getProduct);

module.exports = router;