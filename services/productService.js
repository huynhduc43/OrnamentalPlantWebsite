const productModel = require('../models/productModel');

exports.getListProducts = async (pageNumber, productPerPage, filter) => {
    const queryString = filter.childCatID.childProductTypeID ? filter.childCatID : filter.catID;
    //console.log(queryString);
    let listProducts = await productModel.productModel
        .paginate(queryString, {
            page: pageNumber,
            limit: productPerPage,
        });
    //console.log(listProducts);
    return listProducts;
}

exports.handlePagination = (currentPage, lastPage, filter) => {
    let pagination = [];
    let i;
    let stop;

    if (lastPage < 5) {
        i = 1;
        stop = lastPage + 1;
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
            isActived: currentPage === i,
            catID: filter.catID.productTypeID,
            childCatID: filter.childCatID.childProductTypeID
        };

        pagination.push(pageItem);
    }

    return pagination;
}

exports.getProductDetailInfo = async (req, res, next) => {
    const info = await productModel.productModel
        .findOne({ _id: req.params.productID })
        .populate({ path: "productTypeID", model: "ProductType" })
        .then(async (docs) => {
            const options = {
                path: "childProductTypeID",
                model: "ChildProductType",
            }

            const result = await productModel.productModel.populate(docs, options);
            return result;
        });

    console.log(info);
    return info;
}

exports.getListProductTypes = async (filter) => {
    return listProductTypes = await productModel.productTypeModel.find(filter);
}

exports.getListChildProductTypes = async (filter) => {
    return listChildProductTypes = await productModel.childProductTypeModel.find(filter);
}

exports.getCategory = async (pageNumber, isActived) => {
    let category = await productModel.productTypeModel
        .find({})
        .lean()
        .populate({ path: "childProductTypeID", model: "ChildProductType" })
        .then((docs) => {
            return docs;
        });

    for (let i = 0; i < category.length; i++) {
        category[i].totalProducts = await productModel.productModel.countDocuments({ productTypeID: category[i]._id });
        
        if (isActived) {

            if (isActived.childCatID.childProductTypeID) {
                const t = category[i].childProductTypeID ? category[i].childProductTypeID.length : 0;
                
                for (let j = 0; j < t; j++) {

                    if (isActived.childCatID.childProductTypeID.equals(category[i].childProductTypeID[j]._id)) {
                        category[i].childProductTypeID[j].childCatIDIsActived = true;
                    } else {
                        category[i].childProductTypeID[j].childCatIDIsActived = false;
                    }

                }
                category[i].catIDIsActived = false;

            } else if (category[i]._id.equals(isActived.catID.productTypeID)) {
                category[i].catIDIsActived = true;
            } else {
                //Khi tìm tất cả
            }

        }

    }

    return category;
}

exports.count = async () => {
    return await productModel.productModel.estimatedDocumentCount();
}