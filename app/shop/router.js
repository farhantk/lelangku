var express = require('express');
var router = express.Router();
const { viewShop, viewCreateItem, createItem, sendItem } = require('./controller')
const { isLoginUser } = require('../middleware/auth')

/* GET home page. */
router.get('/sellitem', isLoginUser, viewCreateItem);
router.post('/sellitem', isLoginUser, createItem);
router.post('/:id', isLoginUser, sendItem);
router.get('/:id', isLoginUser, viewShop);

module.exports = router;