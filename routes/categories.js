const express = require('express');
const router = express.Router();
const { 
  getCategories,
  getMongoCategories
} = require('../controllers/categories');

router.get('/', (req, res) => res.redirect('/')); //will redirect to home page
router.get('/mongo', (req, res) => res.redirect('/')); //will redirect to home page

router.get('/:id', getCategories); // will retrieve only the categories associated with the main category (:id)
router.get('/mongo/:id', getMongoCategories); // will retrieve only the categories associated with the main category from MONGODB (:id)

module.exports = router;