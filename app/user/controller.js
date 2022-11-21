const User =  require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const multer = require('multer')
const os = require('os')
module.exports={
    index: async(req, res)=>{
        console.log(req.session.user.id)
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                res.json(result);
            } catch (err) {
                console.log(err)
            }
        });
    },
    editProfile: async(req, res, next)=>{
        try {
            const {name="", phoneNumber="" } =  req.body
            console.log(req.session.user.id)
            const payload = {}
            if(name.length) payload.name = name
            if(phoneNumber.length) payload.phoneNumber = phoneNumber

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