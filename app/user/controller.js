const User =  require('./model')
const Bank =  require('../bank/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const multer = require('multer')
const os = require('os')
module.exports={
    index: async(req, res)=>{
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = {message:alertMessage, status:alertStatus}
        const user = await User.findOne({_id: req.session.user.id})
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                res.render('client/UserProfile/index', {
                    user,
                    id:req.session.user.id,
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
                    alert
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
                const image = req.file.path.split('\\').slice(1).join('\\');
                if(image.length) payload.image = image
                console.log(payload)
                await User.findOneAndUpdate({
                    _id: req.session.user.id
                },payload)
            }else{
                //const image = req.file.path.split('\\').slice(1).join('\\');
                await User.findOneAndUpdate({
                    _id: req.session.user.id
                },payload)
            }
            req.flash('alertMessage', "Profile berhasil diperbaharui")
            req.flash('alertStatus', "success")
            res.redirect('/user')
        } catch (err) {
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', "danger")
            res.redirect('/user')
        }
    },
    viewTopUp: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}

            const user = await User.findOne({_id: req.session.user.id})
            const bank = await Bank.find()
            res.render('client/TopUp/index', {
                user,
                id: req.session.user.id,
                title: "TopUp",
                username : user.username,
                name : user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                province: user.province,
                city: user.city,
                district: user.district,
                ward: user.ward,
                postalCode: user.postalCode,
                fullAddr: user.fullAddr,
                balance: user.balance,
                image: user.image,
                alert,
                bank
            })
            res.redirect('/')
        } catch (err) {
            console.log(err)
        };
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