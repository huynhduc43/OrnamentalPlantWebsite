const mongoose = require('mongoose');

const productService = require('../services/productService');
const reviewProduct = require('../services/reviewService');
const PRODUCT_PER_PAGE = 12;

exports.displayListProducts = async (req, res, next) => {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;

    const catID = req.query.catID;
    const childCatID = req.query.childCatID;

    //ID incorrect
    if ((catID && catID.length != 24) || (childCatID && childCatID.length != 24)) {
        const category = await productService.getCategory(1);

        res.status(404);
        res.render('404', {
            title: "Không tìm thấy trang yêu cầu",
            category: category,
        });
    }

    //const checkCatID = await productService.checkObjectId("productTypeModel", catID);
    //const checkChildCatID = await productService.checkObjectId("childProductTypeModel", childCatID);
    //console.log("checkChildCatID: " + checkChildCatID);
    const filter = {
        catID: catID ? { productTypeID: mongoose.Types.ObjectId(catID) } : {},
        childCatID: childCatID ? { childProductTypeID: mongoose.Types.ObjectId(childCatID) } : {},
    }
    //console.log(filter.catID.productTypeID == null)
    const paginate = await productService.getListProducts(page, PRODUCT_PER_PAGE, filter);
    const category = await productService.getCategory(filter);
    const pagination = productService.handlePagination(paginate.page, paginate.totalPages, filter);
    const countProducts = await productService.count();

    //---Handle breadcrumb---
    const productType = await productService.getListProductTypes({_id: filter.catID.productTypeID});
    const childProductType = await productService.getListChildProductTypes({_id: filter.childCatID.childProductTypeID});
    const breadcrumb = {
        productTypeID: catID,
        productTypeName: productType[0] ? productType[0].productTypeName : productType[0],
        productChildTypeID: childCatID,
        childProductTypeName: childProductType[0] ? childProductType[0].childProductTypeName : childProductType[0],
    };
    //---End Handle breadcrumb---

    let title = breadcrumb.childProductTypeName ? breadcrumb.childProductTypeName : breadcrumb.productTypeName;
    if (!title) title = "Tất cả";

    res.render('products/category', {
        title: "Sản phẩm - " + title,
        totalProductsPerType: paginate.totalDocs,
        limit: (paginate.limit * paginate.page) > paginate.totalDocs ? paginate.totalDocs : paginate.limit * paginate.page,
        listProducts: paginate.docs,
        currentPage: paginate.page,
        prevPage: paginate.prevPage,
        nextPage: paginate.nextPage,
        hasPrevPage: paginate.page !== 1,
        hasNextPage: paginate.totalPages !== paginate.page,
        pagination: pagination,
        category: category,
        totalDocs: countProducts,
        breadcrumb: breadcrumb,
        isActivedForCatAll: filter.catID.productTypeID == null ? true : false,
        catID: catID,
        childCatID: childCatID,
    });
}

exports.displayProductDetail = async (req, res, next) => {
    const productDetail = await productService.getProductDetailInfo(req, res, next);
    const rating = reviewProduct.showRating(productDetail.rating);
    
    const childCatID = req.query.childCatID;
    const filter = {
        //catID: catID ? { productTypeID: mongoose.Types.ObjectId(catID) } : {},
        childCatID: childCatID ? { childProductTypeID: mongoose.Types.ObjectId(childCatID) } : {},
    }

    const category = await productService.getCategory(filter);

    res.render('products/productDetail', {
        title: "Chi tiết - " + productDetail.productName,
        productDetail,
        rating,
        category,
        isActivedForCatAll: false,

    })
}