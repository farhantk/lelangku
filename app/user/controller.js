const User =  require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const multer = require('multer')
const os = require('os')
module.exports={
    index: async(req, res)=>{
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                res.render('client/UserProfile/index', {
                    title: "User",
                    username : result.username,
                    name : result.name,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    province: result.province,
                    city: result.city,
                    district: result.district,
                    ward: result.ward,
                    postalCode: result.postalCode,
                    fullAddr: result.fullAddr,
                    balance: result.balance,
                    image: result.image,
                })
            } catch (err) {
                console.log(err)
            }
        });
    },
    editProfile: async(req, res, next)=>{
        try {
            const {
                name="",
                phoneNumber="",
                province= "",
                city= "",
                district= "",
                ward= "",
                postalCode= "",
                fullAddr= "",
            } =  req.body
            const payload = {}
            if(name.length) payload.name = name
            if(phoneNumber.length) payload.phoneNumber = phoneNumber
            if(province.length) payload.province = province
            if(city.length) payload.city = city
            if(district.length) payload.district = district
            if(ward.length) payload.ward = ward
            if(postalCode.length) payload.postalCode = postalCode
            if(fullAddr.length) payload.fullAddr = fullAddr

            if(req.file){
                console.log(payload)
                const image = req.file.path.split('\\').slice(1).join('\\');
                console.log(image)
                User.findOneAndUpdate({
                    _id: req.session.user.id
                }, {payload},{image:image})
            }else{
                console.log(req.session.user.id)
                await User.findOneAndUpdate({
                    _id: req.session.user.id
                }, payload,{new: true})
            }
            res.redirect('/user')
        } catch (err) {
            res.redirect('/user')
        }
    },
    viewTopUp: async(req, res)=>{
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                const alertMessage = req.flash("alertMessage")
                const alertStatus = req.flash("alertStatus")
                const alert = {message:alertMessage, status:alertStatus}
                res.render('client/TopUp/index', {
                    title: "TopUp",
                    username : result.username,
                    name : result.name,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    province: result.province,
                    city: result.city,
                    district: result.district,
                    ward: result.ward,
                    postalCode: result.postalCode,
                    fullAddr: result.fullAddr,
                    balance: result.balance,
                    image: result.image,
                    alert
                })
                res.redirect('/')
            } catch (err) {
                console.log(err)
            }
        });
    },
    actionTopUp: async(req, res)=>{
        var addbalance =  req.body
        const temp = parseInt(Object.values(addbalance))
        //const temp = parseInt(addbalance)
        User.findOneAndUpdate({
            _id: req.session.user.id
        }, {$inc:{balance:temp}}, (err, result)=>{
            try {
                req.flash('alertMessage', "Topup berhasil dilakukan")
                req.flash('alertStatus', "success")
                res.redirect('/user/topup')
                res.status(200).json({
                    data:result
                })
            } catch (err) {
                console.log(err)
            }
        })
    }
}