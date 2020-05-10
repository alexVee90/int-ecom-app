const express = require('express');
const router = express.Router();
const { 
  getProduct,
  getProducts,
} = require('../controllers/products');

router.get('/', getProducts);
router.get('/:categoryId', getProducts);
router.get('/:categoryId/:id', getProduct);

module.exports = router;