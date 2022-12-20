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
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}

            const user = await User.findOne({_id: req.session.user.id})
            const {id} =  req.params
            let item = await Item.findOne({
                _id:id
            }).populate('seller')
            const item_2 =  await Item.find()
            res.render('client/detailItem/index',{
                id: req.session.user.id,
                title:"detail item",
                name:user.name,
                balance: user.balance,
                itemName: item.name,
                desc: item.desc,
                price: item.price,
                item,
                item_2,
                alert
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
            const seller = req.session.user.id
            const image = req.file.path.split('\\').slice(1).join('\\');
            console.log(">>>", typeof(image))
            console.log(image)
            let item = new Item({ name, desc, category, price, timeLimit, condition, seller, image:image})
            await item.save()
            res.status(201).json({
                data: item
            })
        } catch (err) {
            console.log(err)
        }
    },
    bidItem: async(req, res)=>{
        try {
            console.log("heyaa")
            const buyyer = req.session.user.id
            const {id} = req.params
            const user = await User.findOne({
                _id: buyyer
            })
            const item = await Item.findOne({
                _id: id
            })
            if(user.balance>=(item.price+50000)){
                await Item.findOneAndUpdate({
                    _id:id
                }, {buyyer:buyyer, $inc:{bidCount:1,price:50000}})
                req.flash('alertMessage', "Selamat bid berhasil dilakukan")
                req.flash('alertStatus', "success")
                res.redirect('/')
            }else{
                req.flash('alertMessage', "Saldo anda tidak mencukupi, silahkan isi saldo terlebih dahulu")
                req.flash('alertStatus', "danger")
                res.redirect('/')
            }
            
        } catch (err) {
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', "danger")
            res.redirect('/')          
        }
    }
}