const User = require('../user/model')
const bcrypt = require('bcryptjs')
const config = require('../../config')
const jwt = require('jsonwebtoken')
module.exports={
    view_register: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            res.render('client/signup/index',{
                title: "Masuk | LelangKu",
                alert
            })
        } catch (err) {
            console.log(err)
        }
    },
    view_signIn: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            if (req.session.user === null || req.session.user === undefined) {
                res.render('client/signin/index',{
                    title: "Sign In | LelangKu",
                    alert
                })
              } else {
                res.redirect('/')
              }
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', "danger")
            res.redirect('/signin')
        }
    },
    register: async(req,res,next)=>{
        try {
            const payload = req.body
            if(req.file){

            }else{
                let user = new User(payload)
                if(payload.password.length > 8){
                    await user.save()
                    delete user._doc.password
                    res.status(201).json({
                        data: user,
                    })
                }else{
                    req.flash('alertMessage', "Panjang kata sandi harus lebih dari 8 karakter")
                    req.flash('alertStatus', "danger")
                    res.redirect('/signup')
                }
            }
        } catch (err) {
            if(err && err.name === "ValidationError"){
                req.flash('alertMessage', "Email sudah terdaftar")
                req.flash('alertStatus', "danger")
                res.redirect('/signup')
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
                        username: user.username,
                        balance: user.balance
                    }
                    console.log(req.session.user)
                    res.redirect('/')
                }else{
                    req.flash('alertMessage', "Kata sandi salah")
                    req.flash('alertStatus', "danger")
                    res.redirect('/signin')
                }
            }else{
                req.flash('alertMessage', "Email belum terdaftar")
                req.flash('alertStatus', "danger")
                res.redirect('/signin')
            }
        } catch (error) {
            console.log(error)
            res.redirect('/signin')
        }
    },
    actionSignOut: async(req, res)=>{
        req.session.destroy()
        res.redirect('/')
    }
}