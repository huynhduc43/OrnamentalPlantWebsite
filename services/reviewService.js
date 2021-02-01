const productModel = require('../models/productModel');

exports.showRating = (rating) => {
    let result = [];

    let i = 1;
    for (i; i < rating; i++){
        result.push({
            star: true,
            star_half_o: false,
            star_o: false
        });
    }

    let size = result.length;

    if (rating - size > 0) {
        result.push({
            star: false,
            star_half_o: true,
            star_o: false
        });

        size = size + 1;
    }

    for (let j = 0; j < 5 - size; j++){
        result.push({
            star: false,
            star_half_o: false,
            star_o: true
        });
    }

    return result;
}

exports.rateProduct = async () => {

}