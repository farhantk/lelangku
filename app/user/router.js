var express = require('express');
var router = express.Router();

const { editProfile, index, viewTopUp, actionTopUp } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */

router.get('/', isLoginUser, index);
router.put('/', isLoginUser, editProfile);
router.get('/topup', isLoginUser, viewTopUp);
router.put('/topup', isLoginUser, actionTopUp);

module.exports = router;
