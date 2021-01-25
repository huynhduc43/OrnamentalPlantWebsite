const mongoose = require('mongoose');
const Schema = mongoose.Schema();
//const mongoosePaginate = require('mongoose-paginate-v2');

const reviewSchema = mongoose.Schema({
    productID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Product"},
    userID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"},
    reviewContent: {type: String, require: true},
    reviewDate: {type: Date, default: Date.now()},
    starNumber:{type: Number, require: true, default: 0},
    imagesArr: {type: [String]},
});

const commentSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"},
    reviewID: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Review"},
    commentContent: {type: String, require: true},
    commentDate: {type: Date, default: Date.now()},
    imagesArr: {type: [String]},
});

//reviewSchema.plugin(mongoosePaginate);
//commentSchema.plugin(mongoosePaginate);

const review = mongoose.model('Review', reviewSchema, "Reviews" );
const comment = mongoose.model('Comment', commentSchema, "Comments" );

module.exports = {
    reviewModel: review,
    commentModel: comment
}