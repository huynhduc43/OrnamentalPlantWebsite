"use strict"
const productService = require('../services/productService');
const PRODUCT_PER_PAGE = 12;

exports.displayListProducts = async(req, res, next) => {
    const page = +req.query.page || 1;
    if(page < 0) page = 1;

    const paginate = await productService.getListProducts(page, PRODUCT_PER_PAGE);
    const category = await productService.getCategory(paginate.page);
    const pagination = productService.handlePagination(paginate.page, paginate.totalPages);

    res.render('products/category',{
        title: "Mua cây cảnh online",
        totalDocs: paginate.totalDocs,
        limit: (paginate.limit * paginate.page) > 135 ? 135 : paginate.limit * paginate.page,
        listProducts: paginate.docs,
        //currentPage: paginate.page, 
        prevPage: paginate.prevPage, 
        nextPage: paginate.nextPage,
        hasPrevPage: paginate.page !== 1,
        hasNextPage: paginate.totalPages !== paginate.page,
        pagination: pagination,
        category: category
    });
}

exports.displayProductDetail = async(req, res, next) => {
    const productDetail = await productService.getProductDetailInfo(req, res, next);
    res.render('products/productDetail', {
        title: "Chi tiết - " + productDetail.productName,
        productDetail,
    })
}