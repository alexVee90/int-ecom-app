const asyncWrapper           = require('../util/asyncWrapper');
const getDirname             = require('../util/getDirname');
const path                   = require('path');
const { getChildCategories, getAllCategories } = require('../models/dbApi');

exports.getCategories = asyncWrapper( async (req, res) => { 
  const mainCategory = req.params.id;
  const categories = mainCategory ? await getChildCategories(mainCategory) : await getAllCategories();
  res.render(path.join(getDirname(), 'views', 'products', 'categories'), { categories });
})