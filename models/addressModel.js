const mongoose= require('mongoose');
const Schema = mongoose.Schema();

const addressSchema = mongoose.Schema({
   district: {type: String, required: true},
   province_city: {type: String, required: true},
   ward: {type: String, required: true},
   name: {type: String, required: true},
});

module.exports = mongoose.model('Address', addressSchema, "Addresses" );