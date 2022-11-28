var express = require('express');
var router = express.Router();
const {  index, view_register,view_signIn,register, signIn } = require('./controller')

/* GET home page. */
router.get('/signin', view_signIn);
router.post('/signin', signIn);
router.get('/signup', view_register);
router.post('/signup', register);

module.exports = router;
