const { Category } = require('../models');
const asyncWrapper = require('../util/asyncWrapper');



//@route GET /admin/categories optional ?category=<caegoryName>
//@desc GETS all the categories if no query param is provided || the subcategories of the provided category
//@returns {}
exports.getAllCategories = asyncWrapper(async (req, res) => { 

  const category = req.query.category;

  if(category) {

    const returnedCategories = await Category.find({ parent_category_id: category });

    if(!returnedCategories) return res.status(400).send({ success: false, data: null, reason: 'No categories found under this category'});

    res.status(200).send({ success: true, data: returnedCategories });

  } else {

    const categories = await Category.find({});
    res.status(200).send({ success: true, data: categories});

  }

});



//@route POST /admin/categories 
//@desc adds a category
//@returns {}
exports.postCategory = asyncWrapper(async (req, res) => { 
  const { image, id, name, page_description, page_title, parent_category_id } = req.body;

  const newCategory = new Category({ image, id, name, page_description, page_title, parent_category_id });

  const createdCategory = await newCategory.save();

  res.status(201).send({ success: true, data: createdCategory});
});





//@route GET /admin/categories/:id
//@desc gets a category
//@returns {}
exports.getCategory = asyncWrapper(async (req, res) => { 
  const categoryId = req.params.id;

  const returnedCategory = await Category.findOne({id: categoryId});
  if(!returnedCategory) return res.status(400).send({ success: false, data: null, reason: 'Could not find a category with the provided id' });

  res.status(200).send({ success: true, data: returnedCategory });
});




//@route PUT /admin/categories/:id
//@desc updates a category
//@returns {}
exports.updateCategory = asyncWrapper(async (req, res) => { 
  const categoryId = req.params.id;
  const { image, id, name, page_description, page_title, parent_category_id } = req.body;

  const returnedCategory = await Category.findById(categoryId);
  if(!returnedCategory) return res.status(400).send({ success: false, data: null, reason: 'Could not find a category with the provided id' });

  returnedCategory.image              = image || returnedCategory.image;
  returnedCategory.id                 = id || returnedCategory.id;
  returnedCategory.name               = name || returnedCategory.name;
  returnedCategory.page_description   = page_description || returnedCategory.page_description;
  returnedCategory.page_title         = page_title || returnedCategory.page_title;
  returnedCategory.parent_category_id = parent_category_id || returnedCategory.parent_category_id;

  await returnedCategory.save();

  res.status(200).send({ success: true, data: returnedCategory });
})




//@route DELETE /admin/categories/:id
//@desc deteles a category
//@returns {}
exports.deleteCategory = asyncWrapper(async (req, res) => { 
  const categoryId = req.params.id;

  const returnedCategory = await Category.findByIdAndRemove(categoryId);
  if(!returnedCategory) return res.status(400).send({ success: false, data: null, reason: 'Could not find a category with the provided id' });

  res.status(200).send({ success: true, data: null });
});