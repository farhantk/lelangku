const Item = require('./model')
const User = require('../user/model')
const multer = require('multer')
const date = require('date-and-time');
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
            const item_2 =  await Item.find({post:"Y"})
            let limit = item.timeLimit
            const today = new Date();
            let reameningTime = date.subtract(limit, today).toHours();
            let timeConv = ""
            if(date.subtract(limit, today).toDays()>=1){
                reameningTime = date.subtract(limit, today).toDays();
                timeConv = Math.floor(reameningTime)+" Hari lagi"
            }else if(date.subtract(limit, today).toDays()<1){
                reameningTime = date.subtract(limit, today).toHours();
                timeConv = Math.floor(reameningTime)+" Jam lagi"
            }else if(date.subtract(limit, today).toHours()<1){
                reameningTime = date.subtract(limit, today).toMinutes();
                timeConv = Math.floor(reameningTime)+" Menit lagi"
            }
            if(limit < today){
                console.log("first")
                timeConv = " Selesai"
                await User.findOneAndUpdate({
                    _id: req.session.user.id
                }, {post:"N", status:"Mengirim"})
            }
            res.render('client/detailItem/index',{
                id: req.session.user.id,
                title:item.name,
                name:user.name,
                balance: user.balance,
                itemName: item.name,
                desc: item.desc,
                price: item.price,
                item,
                item_2,
                alert,
                date:timeConv
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    createItem: async(req, res)=>{
        try {
            const {name, desc, category, price, limit, condition} = req.body
            const seller = req.session.user.id
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