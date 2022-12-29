var express = require('express');
var router = express.Router();

const { viewTransaction, finishItem } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */

router.get('/', isLoginUser, viewTransaction);
router.put('/:id', isLoginUser, finishItem);

module.exports = router;