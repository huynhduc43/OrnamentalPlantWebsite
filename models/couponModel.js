const mongoose= require('mongoose');
const Schema = mongoose.Schema();

const couponSchema = mongoose.Schema({
   couponName: {type: String, required: true},
   expiryDate: {type: Date, required: true},
   percentageDiscount : {type: Number, require: true, default: 0},
   scope: {type: [mongoose.Schema.Types.ObjectId], require: true, ref: "Product"}
});

module.exports = mongoose.model('Coupon', addressSchema, "Coupons" );