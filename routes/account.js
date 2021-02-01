const express = require('express');
const router = express.Router();
//const accountController = require('../controllers/accountController');

router.get('/register', function (req, res, next) {
    res.render('account/register', { title: 'Đăng ký tài khoản' });
});

module.exports = router;