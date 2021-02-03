const userService = require('../services/userService');
const productService = require('../services/productService');

exports.login = async () => {

}

exports.logout = async (req, res, next) => {
    req.logout();
    res.redirect('/');
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

exports.displayAccount = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/users/register');
    }

    const id = req.user._id;
    const user = await userService.getUser(id);
    const category = await productService.getCategory(1);

    res.render('user/myAccount', {
        title: "Tài khoản của tôi",
        category: category,
        user: user,
    });
}

exports.displayOrders = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/users/register');
    }

    //const id = req.user._id;
    //const user = await userService.getUser(id);
    const category = await productService.getCategory(1);

    res.render('user/myOrder', {
        title: "Đơn hàng của tôi",
        category: category,
        user: user,
        
    });
}

exports.displayOrderDetail = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/users/register');
    }

    const id = req.user._id;
    const user = await userService.getUser(id);
    const category = await productService.getCategory(1);

    res.render('user/myAccount', {
        title: "Chi tiết đơn hàng",
        category: category,
        user: user,
    });
}

exports.updateAccInfor = async (req, res, next) => {
    await userService.updateAccInfor(req, res);

    //req.logout();
    res.redirect('/users/my-account');
}

exports.updateAvatar = async (req, res, next) => {
    await userService.updateAvatar(req, res, next);

    res.redirect('/users/my-account');
}