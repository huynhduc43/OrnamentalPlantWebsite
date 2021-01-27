const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET products listing. */
router.get('/category', productController.displayListProducts);

router.get('/detail/:productID', productController.displayProductDetail);

module.exports = router;
