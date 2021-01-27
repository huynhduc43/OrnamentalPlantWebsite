var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const homepageController = require('../controllers/homepageController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Mua cây cảnh online' });
// });

router.get('/', homepageController.displayHomepage);

module.exports = router;
