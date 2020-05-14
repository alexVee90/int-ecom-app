const express = require('express');
const router = express.Router();
const { 
  getCategories,
} = require('../controllers/categories');

router.get('/', (req, res) => res.redirect('/')); //will redirect to home page
router.get('/:id', getCategories); // will retrieve only the categories associated with the main category (:id)

module.exports = router;