const mongoose = require('mongoose');
const Schema = mongoose.Schema();
//const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema({
    productName: {type: String, require: true},
    isDeleted: {type: Boolean, require: true, default: false},
    quantity:{type: Number, require: true, default: 0},
    image: {type: String, require: true},
    detailedImgsArr: {type: [String], require: true},
    defaultPrice: {type: Number, require: true}, 
    discountPrice: {type: Number, require: true},
    brandsArr: {type: [String], require: true},//or ObjectId
    productType: {type: mongoose.Schema.Types.ObjectId, require: true},
    description: {type: String, require: true},
    view: {type: Number, require: true, default: 0},
    percentageDiscount : {type: Number, require: true, default: 0},
    addDate: {type: Date, default: Date.now()},
    //transportFee: {type: String, require: true},
});

const productTypeSchema = mongoose.Schema({
    productTypeName: {type: String, require: true},
});

//productSchema.plugin(mongoosePaginate);

const product = mongoose.model('Product', productSchema, "Products" );
const productType = mongoose.model('ProductType', productTypeSchema, "ProductTypes" );

module.exports = {
    productModel: product,
    productTypeModel: productType
}