const productService = require('../services/productService');

exports.displayHomepage = async (req, res, next) => {
    const category = await productService.getCategory(1);

    res.render('index', {
        title: "Bán cây cảnh online",
        category: category,
    })
}

exports.display404Page = async (req, res, next) => {
    const category = await productService.getCategory(1);
    res.status(404);
    
    res.render('404', {
        title: "Không tìm thấy trang yêu cầu",
        category: category,
    })
}