var express = require('express');
var router = express.Router();
const {isLoginUser} = require('../middleware/auth')
const {  index  } = require('./controller')

/* GET home page. */
router.use(isLoginUser)
router.get('/', index);

module.exports = router;