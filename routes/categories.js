const express = require('express');
const router = express.Router();
const { 
  getCategories,
} = require('../controllers/categories');

router.get('/', getCategories); //will retrieve all the categories
router.get('/:id', getCategories); // will retrieve only the categories associated with the main category (:id)

module.exports = router;