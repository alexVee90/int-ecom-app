const express = require('express');
const router = express.Router();

const { 
  getAllCategories,
  postCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/admin');



//MONGO DB API
//CATEGORY

router.get('/categories', getAllCategories);
router.post('/categories', postCategory);
router.get('/categories/:id', getCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;