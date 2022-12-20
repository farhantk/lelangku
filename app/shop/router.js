var express = require('express');
var router = express.Router();
const { viewShop } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */
router.get('/:id', isLoginUser, viewShop);


module.exports = router;