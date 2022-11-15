const User = require('../user/model')
const bcrypt = require('bcryptjs')
const config = require('../../config')
const jwt = require('jsonwebtoken')
module.exports={
    view_register: async(req, res)=>{
        try {
            res.render('client/signup/index',{
                title: "Masuk | LelangKu"
            })
        } catch (err) {
            console.log(err)
        }
    },
    view_signIn: async(req, res)=>{
        try {
            if (req.session.user === null || req.session.user === undefined) {
                res.render('client/signin/index',{
                    title: "Sign In | LelangKu"
                })
              } else {
                res.redirect('/')
              }
        } catch (err) {
            console.log(err)
            res.redirect('/signin')
        }
    },
    register: async(req,res,next)=>{
        try {
            const payload = req.body
            if(req.file){

            }else{
                let user = new User(payload)
                await user.save()
                delete user._doc.password
                res.status(201).json({
                    data: user
                })
            }
        } catch (err) {
            if(err && err.name === "ValidationError"){
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
            next(err)
        }
    },
    signIn: async(req, res, next)=>{
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                email: email
            })
            if(user) {
                const checkPass = await bcrypt.compare(password, user.password)
                if(checkPass){
                    req.session.user = {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }
                    console.log(req.session.user)
                    res.redirect('/')
                }else{
                    res.redirect('/signin')
                }
            }else{
                res.redirect('/signin')
            }
        } catch (error) {
            console.log(error)
            res.redirect('/signin')
        }
    }
}