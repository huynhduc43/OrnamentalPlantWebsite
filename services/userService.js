const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');
const saltRounds = 10;

exports.addUser = async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.username,
        password: req.body.password,
        avatar: "https://medevacfoundation.org/wp-content/uploads/2020/05/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
    }

    await bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            const user = new userModel.userModel({
                name: req.body.name,
                email: newUser.email,
                password: hash,
                avatar: "https://medevacfoundation.org/wp-content/uploads/2020/05/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg",
            });

            await user.save();
        });
        
    });
}

exports.getUser = (id) => {
    return userModel.userModel.findOne({ _id: id });
}

exports.checkCredential = async (username, password) => {
    const user = await userModel.userModel.findOne({ email: username });

    if (!user) return false;

    let checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) return user;
    
    return false;
}

exports.logout = async (req, res) => {
    req.logout();
    res.redirect('/');
}