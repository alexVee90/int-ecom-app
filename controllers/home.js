const { getChildCategories } = require('../models/dbApi')
const asyncWrapper           = require('../util/asyncWrapper');
const { Category }           = require('../models');



// @desc     home-route
// @access   public
exports.getHomeRoute = asyncWrapper(async (req, res) => { 
    const categories = await getChildCategories('root');
    const mongoCategories = await Category.find({ parent_category_id: 'root' });
    
    res.status(200).render('home', { categories, mongoCategories });
})