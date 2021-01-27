const productModel = require('../models/productModel');

exports.getListProducts = async (pageNumber, productPerPage) => {
    let listProducts = await productModel.productModel
        .paginate({}, {
            page: pageNumber,
            limit: productPerPage,
        });
    //console.log(listProducts);
    return listProducts;
}

exports.handlePagination = (currentPage, lastPage) => {
    let pagination = [];
    let i;
    let stop;

    if (lastPage < 5) {
        i = 1;
        stop = lastPage;
    } else {
        if (currentPage <= 3) {
            i = 1;
        } else if (currentPage > 3 && currentPage <= lastPage - 2) {
            i = currentPage - 2;
        } else {
            i = lastPage - 4;
        }

        stop = i + 5;
    }

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
    const info = await productModel.productModel.findOne({ _id: req.params.productID });
    //console.log(info);
    return info;
}

exports.getListProductTypes = async () => {
    return listProductTypes = await productModel.productTypeModel.find({});
}

exports.getCategory2 = async () => {
    const category = await productModel.childProductTypeModel
        .find({})
        .populate({ path: "parentProductTypeID", model: "ProductType" })
        .then((docs) => {
            return docs;
        });
    //console.log(category);
    return category;
}

exports.getCategory = async (pageNumber) => {
    let category = await productModel.productTypeModel
        .find({})
        .lean()
        .populate({ path: "childProductTypeID", model: "ChildProductType" })
        .then((docs) => {
            return docs;
        });

    //Add page number
    for (let i = 0; i < category.length; i++){
        category[i].pageNumber = pageNumber;
    }

    //console.log(category);
    return category;
}