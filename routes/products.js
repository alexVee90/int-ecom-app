const express = require('express');
const router = express.Router();
const { 
  getProduct,
  getProducts,
} = require('../controllers/products');

router.get('/', getProducts);
router.get('/:id', getProduct);

module.exports = router;