const axios = require('axios');

//load the env vars
require('dotenv').config();

/*
 @desc GET /categories  gets all categories
 @returns an array
*/
exports.getAllCategories = async () => { 
  try {
    const categories = await axios.get(`${process.env.DB_API}/categories?secretKey=${process.env.SECRET_KEY}`)
    return categories.data;
  } catch (error) {
    throw error
  }
}

/*
 @desc GET /categories/parent/<id of the category> gets all categories with parent ID equals to the ID you are passing
 @params type a string - the parent category name
 @returns an array
*/
exports.getChildCategories = async parent => { 
  try {
    const categories = await axios.get(`${process.env.DB_API}/categories/parent/${parent}?secretKey=${process.env.SECRET_KEY}`)
    return categories.data;
  } catch (error) {
    throw error
  }
}

/*
 @desc GET /categories/<id of the category> gets all categories with ID equals to the ID you are passing
 @params type a string - the category name
 @returns an object
*/
exports.getSingleCategory = async input => { 
  try {
    const category = await axios.get(`${process.env.DB_API}/categories/${input}?secretKey=${process.env.SECRET_KEY}`)
    return category.data;
  } catch (error) {
    throw error
  }
}

/*
 @desc GET /products/product_search gets first 25 products from the database
 @route takes in an optional page param
 @params type number - OPTIONAL
 @returns an array of objects
*/
exports.getAllProducts = async (page) => { 
  try {
    const products = await axios.get(`${process.env.DB_API}/products/product_search?secretKey=${process.env.SECRET_KEY}&page=${page}`)
    return products.data;
  } catch (error) {
    throw error
  }
}


/*
 @desc GET /products/product_search?id=<id>&secretKey=<secretKey> gets the products that matches the id from the query
 @params type string - the id you wish to retrieve from the db
 @returns an array with one object inside
*/
exports.getSingleProduct = async id => { 
  try {
    const product = await axios.get(`${process.env.DB_API}/products/product_search?id=${id}&secretKey=${process.env.SECRET_KEY}`)
    return product.data;
  } catch (error) {
    throw error
  }
}

 /*
  @desc GET /products/product_search?primary_category_id=womens-clothing-tops&secretKey=<secretKey>​ gets the products that matches the primary_category_id from the query
  @params type string, number - the primary_category_id you wish to retrieve from the db + the page
  @returns an array of objects
*/
 exports.getProductsFromSubcategory = async (subcategory, page) => { 
  try {
    const products = await axios.get(`
      ${process.env.DB_API}/products/product_search?primary_category_id=${subcategory}&secretKey=${process.env.SECRET_KEY}&page=${page}
    `)
    return products.data;
  } catch (error) {
    throw error
  }
}