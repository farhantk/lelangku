var express = require('express');
var router = express.Router();

const { viewTransaction } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */

router.get('/', isLoginUser, viewTransaction);

module.exports = router;