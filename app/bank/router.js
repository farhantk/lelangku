var express = require('express')
var router =  express.Router()
const {index, actionCreate, actionEdit, actionDelete} = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', index);
router.post('/', actionCreate)
router.put('/:id', actionEdit)
router.delete('/:id', actionDelete)

module.exports = router;