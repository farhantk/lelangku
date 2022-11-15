var express = require('express');
var router = express.Router();
const { editProfile, view_editProfile } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */

router.get('/profile', isLoginUser, view_editProfile);
router.put('/profile', isLoginUser, editProfile);

module.exports = router;
