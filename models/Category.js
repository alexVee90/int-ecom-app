const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  page_description: {
    type: String,
    required: true
  },
  page_title: {
    type: String,
    required: true
  },
  parent_category_id: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Category', categorySchema);