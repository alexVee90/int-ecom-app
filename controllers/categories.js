const asyncWrapper           = require('../util/asyncWrapper');
const getDirname             = require('../util/getDirname');
const path                   = require('path');
const { getChildCategories, getAllCategories, getSingleCategory } = require('../models/dbApi');

exports.getCategories = asyncWrapper( async (req, res) => { 
  const mainCategorySlug = req.params.id;
  let mainCategory = '';
  
  const categories = mainCategorySlug ? await getChildCategories(mainCategorySlug) : await getAllCategories();
  if(mainCategorySlug) { 
    mainCategory = await getSingleCategory(mainCategorySlug);
  }
  res.render(path.join(getDirname(), 'views', 'products', 'categories'), {mainCategory, categories });
})