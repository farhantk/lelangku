const User = require('../user/model')
const config = require('../../config')
const jwt = require('jsonwebtoken')
module.exports={
    isLoginUser : async(req, res, next) =>{ 
      if (req.session.user === null || req.session.user === undefined) {
        res.redirect('/signin')
      } else {
        next()
      }
    },
    isLoginAdmin: (req, res, next)=>{
      if (req.session.admin === null || req.session.admin === undefined) {
        res.redirect('/admin')
      } else {
        next()
      }
    },
    
}

