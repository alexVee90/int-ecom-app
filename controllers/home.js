const { getChildCategories } = require('../models/dbApi')
const { getMongoCategories } = require('../models/mongoApi')
const asyncWrapper           = require('../util/asyncWrapper');



// @desc     home-route
// @access   public
exports.getHomeRoute = asyncWrapper(async (req, res) => { 
    const categories = await getChildCategories('root');
    const mongoCategories = await getMongoCategories('root');
    
    res.status(200).render('home', { categories, mongoCategories });
})