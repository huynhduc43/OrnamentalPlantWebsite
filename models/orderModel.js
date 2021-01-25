const mongoose = require('mongoose');
const Schema = mongoose.Schema();
//const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"},
    totalOrderValue: {type: Number, require: true, default: 0},
    orderDate: {type: Date, require: true, default: Date.now()},
    deliveryDate: {type: Date, require: true},
    payment: {type: String, require: true},//or ObjectId
    receiverInfor: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "ReceiverInfor"}, 
    //coupons: {type: [mongoose.Schema.Types.ObjectId], require: true},
});

const detailedOrderSchema = mongoose.Schema({
    orderID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Order"},
    productID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Product"},
    quantity: {type: Number, require: true, default: 0},
    total: {type: Number, require: true, default: 0},
});

const receiverInforSchema = mongoose.Schema({
    orderID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Order"},
    userID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"},
    receiverName: {type: String, require: true},
    receiverAddress: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Address"},
    receiverPhoneNumber: {type: String, require: true},
    receiverEmail: {type: String, require: true},
});

//orderSchema.plugin(mongoosePaginate);
//detailedOrderSchema.plugin(mongoosePaginate);

const order = mongoose.model('Order', orderSchema, "orders" );
const detailedOrder = mongoose.model('DetailedOrder', detailedOrderSchema, "DetailedOrders" );
const receiverInfor = mongoose.model('receiverInfor', receiverInforSchema, "receiverInfors" );

module.exports = {
    orderModel: order,
    detailedOrderModel: detailedOrder,
    receiverInforModel: receiverInfor
}