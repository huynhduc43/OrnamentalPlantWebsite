var express = require('express');
var router = express.Router();
const passport = require('../passport');

const userController = require('../controllers/userController');


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  failureFlash: true
}));

//Display login & register page
router.get('/register', userController.displayRegisterPage);

router.post('/register', userController.register);

router.get('/logout', userController.logout);

router.get('/my-account', userController.displayAccount);

router.put('/my-account/update-infor', userController.updateAccInfor);

router.put('/my-account/update-avatar', userController.updateAvatar);

module.exports = router;
