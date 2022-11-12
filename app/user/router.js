var express = require('express');
var router = express.Router();
const { index, editProfile } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */
router.get('/', isLoginUser, index);
router.put('/', isLoginUser, editProfile);

module.exports = router;
