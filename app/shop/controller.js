const User = require('../user/model')
const Item = require('../item/model')
const Category = require('../Category/model')
const date = require('date-and-time');
const multer = require('multer')
const os = require('os')
module.exports={
    viewShop: async(req, res)=>{
        try {
            const user = await User.findOne({_id: req.session.user.id})
            let item = await Item.find(
                {seller: req.session.user.id}
            )
            res.render('client/itemToko/index',{
                user,
                id: req.session.user.id,
                name : user.name,
                email: user.email,
                balance: user.balance,
                phoneNumber: user.phoneNumber,
                province: user.province,
                city: user.city,
                district: user.district,
                ward: user.ward,
                postalCode: user.postalCode,
                fullAddr: user.fullAddr,
                image: user.image,
                item
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    viewCreateItem: async(req,res)=>{
        try {
            const categoryModel = await Category.find()
            const user = await User.findOne({_id: req.session.user.id})
            res.render('client/addItem/index',{
                user,
                id: req.session.user.id,
                name : user.name,
                email: user.email,
                balance: user.balance,
                categoryModel
            })
        } catch (err) {
            console.log(err)
        }
    },
    createItem: async(req, res)=>{
        try {
            
            const {name, desc, category, price, limit, condition} = req.body
            const seller = req.session.user.id
            console.log(req.files)
            const image = req.file.path.split('\\').slice(1).join('\\');
            const now = new Date();
            if(limit=='3 hari'){
                timeLimit = date.addSeconds(now, 3*86400);
            }else if(limit=='7 hari'){
                timeLimit = date.addSeconds(now, 7*86400);
            }else if(limit=='14 hari'){
                timeLimit = date.addSeconds(now, 14*86400);
            }else if(limit=='21 hari'){
                timeLimit = date.addSeconds(now, 21*86400);
            }else{
                timeLimit = date.addSeconds(now, 28*86400);
            }
            
            let item = new Item({ name, desc, category, price, timeLimit, condition, seller, image:image})
            await item.save()
            res.status(201).json({
                data: item
            })
        } catch (err) {
            console.log(err)
        }
    },
}