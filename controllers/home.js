const { getChildCategories } = require('../models/dbApi')
const asyncWrapper           = require('../util/asyncWrapper');

// @desc     home-route
// @access   public
exports.getHomeRoute = asyncWrapper(async (req, res) => { 
    const categories = await getChildCategories('root');
    res.status(200).render('home', { categories });
})