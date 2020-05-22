const { getChildCategories } = require('../models/dbApi')
const asyncWrapper           = require('../util/asyncWrapper');

const { Category } = require('../models');

// @desc     home-route
// @access   public
exports.getHomeRoute = asyncWrapper(async (req, res) => { 
    const categories = await getChildCategories('root');
    // const Appliances = new Category({
    //     image: "categories/mens-accessories-luggage.jpg",
    //     id: "mens-accessories-luggage",
    //     name: "Luggage",
    //     page_description: "Shop Men's Wheeled Luggage. Versatile, rugged suitcases, baggage, holdalls and shoulder bags. All with famous long-lasting quality.",
    //     page_title: "Men's Wheeled Luggage",
    //     parent_category_id: "mens-accessories",
    // });
    // console.log(Appliances);
    res.status(200).render('home', { categories });
})