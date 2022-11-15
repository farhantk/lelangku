const User =  require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const multer = require('multer')
const os = require('os')
module.exports={
    view_editProfile: async(req, res)=>{
        try {
            res.status(200).json({
                data: req.user
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    editProfile: async(req, res, next)=>{
        try {
            const {name="", phoneNumber="" } =  req.body

            const payload = {}
            if(name.length) payload.name = name
            if(phoneNumber.length) payload.phoneNumber = phoneNumber

            if(req.file){
                const image = req.file.path
                const user =  await User.findOneAndUpdate({
                    _id: req.user._id
                }, {payload,
                     image:image}, {new:true, runValidators:true})
                console.log(image)
                res.status(201).json({
                    data: {
                        id: user.id,
                        image: image,
                        name: user.name,
                        phoneNumber: user.phoneNumber
                    }
                })
            }else{
                const user =  await User.findOneAndUpdate({
                    _id: req.user._id
                }, payload, {new:true, runValidators:true})
                res.status(201).json({
                    data: {
                        id: user.id,
                        name: user.name,
                        phoneNumber: user.phoneNumber
                    }
                })
            }
        } catch (err) {
            
        }
    }
}