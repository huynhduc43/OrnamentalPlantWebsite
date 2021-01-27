const productService = require('../services/productService');

exports.displayHomepage= async (req, res, next) => {
    const category = await productService.getCategory(1);
    res.render('index', {
        title: "Mua cây cảnh online",
        category: category,
    })
}