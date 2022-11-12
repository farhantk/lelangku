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
            res.render('client/signin/index',{
                title: "Masuk | LelangKu"
            })
        } catch (err) {
            console.log(err)
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
    signIn: (req, res, next)=>{
        const {email, password} = req.body
        User.findOne({email:email}).then((user)=>{
            if(user){
                const checkPass = bcrypt.compareSync(password, user.password)
                if(checkPass){
                    const token = jwt.sign({
                        user:{
                            id:user.id,
                            username:user.username,
                            email:user.email,
                            nama:user.nama,
                            phoneNumber:user.phoneNumber,

                        }
                    }, config.jwtKey)
                    res.status(200).json({
                        data: {token}
                    })
                }else{
                    res.status(403).json({
                        message: 'Password anda salah'
                    })
                }
            }else{
                res.status(403).json({
                    message: 'Email anda belum terdaftar'
                })
            }
        }).catch((err)=>{
            res.status(500).json({
                message: err.message || 'server error'
            })
            next()
        })
    }
}