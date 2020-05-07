const express = require('express');
const router = express.Router();
const { getHomeRoute } = require('../controllers/home')

router.get('/', getHomeRoute)

module.exports = router;