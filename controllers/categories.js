const asyncWrapper           = require('../util/asyncWrapper');
const getDirname             = require('../util/getDirname');
const path                   = require('path');
const { getChildCategories, getAllCategories, getSingleCategory } = require('../models/dbApi');

exports.getCategories = asyncWrapper( async (req, res) => { 
  const mainCategorySlug = req.params.id;
  let mainCategory = '';
  
  // const categories = mainCategorySlug ? await getChildCategories(mainCategorySlug) : await getAllCategories();
  let categories = await getAllCategories();
  if(mainCategorySlug) { 
    mainCategory = await getSingleCategory(mainCategorySlug);
  }

  const m = /^mens$/;
  const w = /^womens$/;

  if(mainCategorySlug) {
    if(mainCategorySlug === 'mens') {
      let men = categories.filter(c => {
        if(c.parent_category_id !== 'root') { 
          let slugArr = c.id.split('-');
          if(m.test(slugArr[0])) { 
            return c;
          } 
        }
      });
      categories = men;
    } else { 
      let women = categories.filter(c => {
        if(c.parent_category_id !== 'root') { 
          let slugArr = c.id.split('-');
          if(w.test(slugArr[0])) { 
            return c;
          } 
        }
      });
      categories = women;
    }
  }
  res.render(path.join(getDirname(), 'views', 'products', 'categories'), {mainCategory, categories });
})