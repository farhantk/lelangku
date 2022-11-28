var express = require('express');
var router = express.Router();
<<<<<<< Updated upstream
const { index, editProfile } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */
router.get('/', isLoginUser, index);
router.put('/', isLoginUser, editProfile);
=======
const { editProfile, index } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */

router.get('/', isLoginUser, index);
router.put('/', isLoginUser, editProfile);
>>>>>>> Stashed changes

module.exports = router;
