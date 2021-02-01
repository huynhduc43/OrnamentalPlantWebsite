const productModel = require('../models/productModel');

exports.getListProducts = async (pageNumber, productPerPage, filter) => {
    const queryString = filter.childCatID.childProductTypeID ? filter.childCatID : filter.catID;
    console.log(queryString);
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
    const id = req.params.productID;

    await this.addView(id);

    const info = await productModel.productModel
        .findOne({ _id: id })
        .populate({ path: "productTypeID", model: "ProductType" })
        .then(async (docs) => {
            const options = {
                path: "childProductTypeID",
                model: "ChildProductType",
            }

            const result = await productModel.productModel.populate(docs, options);
            return result;
        });

    //console.log(info);
    return info;
}

exports.getListProductTypes = async (filter) => {
    return listProductTypes = await productModel.productTypeModel.find(filter);
}

exports.getListChildProductTypes = async (filter) => {
    return listChildProductTypes = await productModel.childProductTypeModel.find(filter);
}

exports.getCategory = async (isActived) => {
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

            if (isActived.childCatID && isActived.childCatID.childProductTypeID) {
                const t = category[i].childProductTypeID ? category[i].childProductTypeID.length : 0;

                for (let j = 0; j < t; j++) {

                    if (isActived.childCatID.childProductTypeID.equals(category[i].childProductTypeID[j]._id)) {
                        category[i].childProductTypeID[j].childCatIDIsActived = true;
                    } else {
                        category[i].childProductTypeID[j].childCatIDIsActived = false;
                    }

                }
                category[i].catIDIsActived = false;

            } else if (isActived.catID && category[i]._id.equals(isActived.catID.productTypeID)) {
                category[i].catIDIsActived = true;
            } else {
                //Khi tìm tất cả
            }

        }

    }
    //console.log(category);
    return category;
}

exports.count = async () => {
    return await productModel.productModel.estimatedDocumentCount();
}

exports.addView = async (id) => {
    const product = await productModel.productModel.findOne({ _id: id });
    await productModel.productModel.findOneAndUpdate({ _id: id }, { view: product.view + 1 });
}

exports.checkObjectId = async (model, id) => {
    let result;

    if (id) {
        if (id.length == 24) {
            switch (model) {
                case "childProductTypeModel":
                    result = await productModel.childProductTypeModel.findOne({ _id: id }) ? id : false;
                    break;

                case "productTypeModel":
                    result = await productModel.productTypeModel.findOne({ _id: id }) ? id : false;
                    break;

                default:
                    break;
            }
        } else {
            if (id.length != 24) {
                result = "000000000000000000000001";
            }
        }
    }

    return result;
}