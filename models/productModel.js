const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema({
    productName: {type: String, require: true},
    isDeleted: {type: Boolean, require: true, default: false},
    quantity:{type: Number, require: true, default: 0},
    image: {type: String, require: true},
    detailedImgsArr: {type: [String], require: true},
    defaultPrice: {type: Number, require: true}, 
    discountPrice: {type: Number, require: true, default: 0},
    brandsArr: {type: [String], require: true},//or ObjectId
    productTypeID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "ProductType"},
    description: {type: String, require: true},
    view: {type: Number, require: true, default: 0},
    percentageDiscount : {type: Number, require: true, default: 0},
    addDate: {type: Date, default: Date.now()},
    guide: {type: String, require: true},
    childProductTypeID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "ChildProductType"},
    rating: {type: mongoose.Types.Decimal128, require: true, default: 0},
    //transportFee: {type: String, require: true},
});

const productTypeSchema = mongoose.Schema({
    productTypeName: {type: String, require: true},
    childProductTypeID: {type: [mongoose.Schema.Types.ObjectId], require: true, ref: "ChildProductType"},
});

const childProductTypeSchema = mongoose.Schema({
    //parentProductTypeID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "ProductType"},
    childProductTypeName: {type: String, require: true},
});

productSchema.plugin(mongoosePaginate);

const product = mongoose.model('Product', productSchema, "Products" );
const productType = mongoose.model('ProductType', productTypeSchema, "ProductTypes" );
const childProductType = mongoose.model('ChildProductType', childProductTypeSchema, "ChildProductTypes" );

module.exports = {
    productModel: product,
    productTypeModel: productType,
    childProductTypeModel: childProductType
}