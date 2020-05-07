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