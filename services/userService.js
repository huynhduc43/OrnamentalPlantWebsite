const bcrypt = require('bcrypt');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const fse = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

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

exports.getUser = async (id) => {
    let user = await userModel.userModel.findOne({ _id: id }).lean().lean();
    let genderRadio;

    if (user.gender === "Nam") {
        genderRadio = {
            male: true,
            female: false,
            other: false,
        };
    } else if (user.gender === "Nữ") {
        genderRadio = {
            male: false,
            female: true,
            other: false,
        };
    } else {
        genderRadio = {
            male: false,
            female: false,
            other: true,
        };
    }

    user.genderRadio = genderRadio;
    console.log(user);
    return user;
}

exports.checkCredential = async (username, password) => {
    const user = await userModel.userModel.findOne({ email: username });

    if (!user) return false;

    let checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) return user;

    return false;
}

// exports.logout = async (req, res) => {
//     req.logout();
//     res.redirect('/');
// }

exports.updateAccInfor = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/users/register');
    }

    const id = req.user._id;
    console.log("id: " + id);
    const data = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        DoB: req.body.DoB,
        gender: req.body.gender,
    }
    console.log(req.body);

    await userModel.userModel.findOneAndUpdate({ _id: id }, data, (err, doc) => {
        console.log(doc);
    });
}

//Upload and get a image link
exports.uploadImg = async (coverImg, cloudinaryFolder, res, next) => {
    //Delete temp files
    fse.remove(coverImg.path, err => {
        if (err) return console.error(err);
        console.log('Delete successful!');
    })

    const publicID = cloudinaryFolder + '/' + coverImg.path.split('\\').pop();

    await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(coverImg.path, { public_id: publicID }, (err, result) => {
            if (err) {
                return reject(err);
            }
            //console.log(return cloudinary.url(publicID););
            resolve(result);
            //return resolve(result);
        });
    });

    return cloudinary.url(publicID);
}

exports.updateAvatar = async (req, res, next) => {
    const form = formidable({ multiples: true });

    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
            }

            const avatar = files.userAvatar;

            if (avatar && avatar.size > 0) {
                await this.uploadImg(avatar, 'userAvatar')
                    .then((avatarLink) => {
                        console.log("Link avt: " + avatarLink);
                        const IDQuery = req.user._id;
                        const newAvatar = { avatar: avatarLink };
                        
                        userModel.userModel.findOneAndUpdate({ _id: IDQuery }, newAvatar, { new: true }, (err, doc) => {
                            if (err) reject(err);
                        });
                        console.log("Update user avatar successful!");
                    });
            }

            resolve();
            //return fields._id;
        });
    });
}