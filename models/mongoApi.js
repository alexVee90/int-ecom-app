const axios = require('axios');

exports.getMongoCategories = async (category) => {
  try {
    const categories = await axios.get(`http://localhost:4000/admin/categories?category=${category}`)
    return categories.data.data;
  } catch (error) {
    throw error
  }
}

exports.getMongoCategory = async (category) => {
  try {
    const categories = await axios.get(`http://localhost:4000/admin/categories/${category}`)
    return categories.data.data;
  } catch (error) {
    throw error
  }
}