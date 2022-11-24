var express = require('express');
var router = express.Router();
const { index, topup } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */
router.get('/', isLoginUser, index);
router.put('/', isLoginUser, topup);

module.exports = router;