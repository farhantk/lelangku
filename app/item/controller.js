const Item = require('./model')
const User = require('../user/model')
const multer = require('multer')
const os = require('os')
module.exports={
    landingPage: async(req, res)=>{
        try {
            const {id} =  req.params
            let item = await Item.find()
            .populate('category')
                .select('_id name images floatingPrice')
            res.status(200).json({
                data: item
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    detailItem: async(req, res)=>{
        try {
            const user = await User.findOne({_id: req.session.user.id})
            const {id} =  req.params
            let item = await Item.findOne({
                _id:id
            })
            res.render('client/detailItem/index',{
                name:user.name,
                balance: user.balance,
                itemName: item.name,
                desc: item.desc,
                price: item.floatingPrice
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    createItem: async(req, res)=>{
        try {
            const {name, desc, category, price, timeLimit, condition} = req.body
            const image = req.file.path.split('\\').slice(1).join('\\');
            console.log(">>>", typeof(image))
            console.log(image)
            let item = new Item({ name, desc, category, price, timeLimit, condition, image:image})
            await item.save()
            res.status(201).json({
                data: item
            })
        } catch (err) {
            console.log(err)
        }
    },
}