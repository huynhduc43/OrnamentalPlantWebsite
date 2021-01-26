const productModel = require('../models/productModel');

exports.getListProducts = async (pageNumber, productPerPage) => {
    let listProducts = await productModel.productModel.paginate({}, {
        page: pageNumber,
        limit: productPerPage,
    });
    //console.log(listProducts);
    return listProducts;
}

exports.handlePagination = (currentPage, lastPage) => {
    let pagination = [];
    let i;

    if (currentPage <= 3) {
        i = 1;
    } else if (currentPage > 3 && currentPage <= lastPage - 2) {
        i = currentPage - 2;
    } else {
        i = lastPage - 4;
    }

    const stop = i + 5;

    for (i; i < stop; i++) {
        const pageItem = {
            pageNumber: i,
            isActived: currentPage === i
        };

        pagination.push(pageItem);
    }

    return pagination;
}

exports.getProductDetailInfo = async (req, res, next) => {
    const info = await productModel.productModel.findOne({_id: req.params.id});
    console.log(info);
    return info;
}