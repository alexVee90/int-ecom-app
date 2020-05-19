const asyncWrapper            = require('../util/asyncWrapper');
const getDirname              = require('../util/getDirname');
const path                    = require('path');
const { 
  getAllProducts, 
  getSingleProduct, 
  getProductsFromSubcategory,
  getAllCategories
 } = require('../models/dbApi');

exports.getProducts = asyncWrapper(async(req, res) => { 
  const subcategory = req.params.categoryId || 'all';
  const page = req.query.page || 1;

  const products = subcategory === 'all' ? await getAllProducts(page) : await getProductsFromSubcategory(subcategory, page);

  res.render(
    path.join(getDirname(), 'views', 'products', 'product-list'), 
    { 
      products, 
      hasPreviousPage: page > 1,
      currentPage: Number(page),
      previousPage: Number(page) - 1,
      nextPage: Number(page) + 1,
      subcategory
    });
})

exports.getProduct = asyncWrapper(async (req, res) => { 
  const productId = req.params.id;
  const [ product ] = await getSingleProduct(productId);
  res.render(path.join(getDirname(), 'views', 'products', 'product-details'), { product });
});



exports.getSearchProducts = asyncWrapper(async (req, res) => { 
  const { searchText } = req.query;
  const regex = new RegExp(searchText);
  let products = [];
  
  const categories = await getAllCategories();

  if(searchText) { 
    const returnedCat = categories.find(category => {
      return regex.test(category.page_description.toLowerCase().split(' '));                 
    });

    if(returnedCat) {
      products = await getProductsFromSubcategory(returnedCat.id);
    }
  }

  res.render(path.join(getDirname(), 'views', 'products', 'products-search'), { products });
});