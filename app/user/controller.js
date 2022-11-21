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
                    name : result.name,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    province: result.province,
                    city: result.city,
                    district: result.district,
                    ward: result.ward,
                    postalCode: result.postalCode,
                    fullAddr: result.fullAddr,

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
            if(province.length) payload.province = province
            if(city.length) payload.city = city
            if(district.length) payload.district = district
            if(ward.length) payload.ward = ward
            if(postalCode.length) payload.postalCode = postalCode
            if(fullAddr.length) payload.fullAddr = fullAddr

            if(req.file){
                console.log(payload)
                const image = req.file.path
                User.findOneAndUpdate({
                    _id: req.session.user.id
                }, {payload,
                     image:image})
                res.status(201).json({
                    data: result
                })
            }else{
                console.log(req.session.user.id)
                await User.findOneAndUpdate({
                    _id: req.session.user.id
                }, payload,{new: true},(err, result)=>{
                    res.status(201).json({
                        data: result
                    })
                })
            }
            
        } catch (err) {
            
        }
    }
}