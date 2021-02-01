const mongoose = require('mongoose');
const Schema = mongoose.Schema();
//const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
    //username: {type: String, require: true},
    name: {type: String, require: true},
    password: {type: String, require: true},
    DoB: {type: String, require: true},
    phoneNumber: {type: String, require: true}, 
    email: {type: String, require: true},
    address: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Address"},
    gender: {type: String, require: true},
    avatar: {type: String},
    isLocked:{type: Boolean, require: true, default: false},
    userType: {type: mongoose.Schema.Types.ObjectId , require: true, ref: "UserType"},

    //id : {type: String, require: true},
    //token : {type: String, require: true},
});

const userTypeSchema = mongoose.Schema({
    userTypeName: {type: String, require: true},
});

//userSchema.plugin(mongoosePaginate);

const user = mongoose.model('User', userSchema, "Users" );
const userType = mongoose.model('UserType', userTypeSchema, "UserTypes" );

module.exports = {
    userModel: user,
    userTypeModel: userType
}