const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/userModel');
const userService = require('../services/userService');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await userService.checkCredential(username, password);

        if (!user) {
            return done(null, false, { message: 'Email hoặc mật khẩu không đúng!' });
        } else {
            console.log("Đăng nhập thành công!");
            return done(null, user);
        }
    }
));

//Chỉ cho passport biết khi có user rồi (đã đăng nhập, chứng thực) thì cần lưu thông tin gì vào session
//Ở đây đang lưu user._id
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

//Passport đọc thông tin từ session
passport.deserializeUser((id, done) => {
    userService.getUser(id).then((user) => {
        done(null, user);
    });
});

module.exports = passport;
