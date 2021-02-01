const userService = require('../services/userService');
const productService = require('../services/productService');

exports.login = async () => {

}

exports.logout = async (req, res, next) => {
    await userService.logout(req, res);
}

exports.register = async (req, res, next) => {
    await userService.addUser(req, res, next);
    console.log("Add new user successful!");

    res.redirect('/');
}

exports.displayRegisterPage = async (req, res, next) => {
    const category = await productService.getCategory(1);

    res.render('user/register', {
        title: 'Đăng ký tài khoản',
        category: category,
    });
}

exports.displayUserInfor = async (req, res, next) => {
    res.send('Trang thông tin người dùng');
}