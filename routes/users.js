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

router.get('/my-account', userController.displayUserInfor);

// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
