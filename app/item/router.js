var express = require('express');
var router = express.Router();
const { landingPage, detailItem, createItem, bidItem } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */
router.get('/landingpage', isLoginUser, landingPage);
router.get('/:id', isLoginUser, detailItem);
router.put('/:id', isLoginUser, bidItem);



module.exports = router;