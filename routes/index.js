var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Mua cây cảnh online' });
// });

router.get('/', productController.displayListProducts);

module.exports = router;
