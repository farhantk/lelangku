const User = require('../user/model')
const Item = require('../item/model')
const Category = require('../Category/model')
const Expedition = require('../expedition/model')
const Invoice = require('../invoice/model')
const date = require('date-and-time');
const multer = require('multer')
const os = require('os')
module.exports={
    viewShop: async(req, res)=>{
        try {
            const expedition = await Expedition.find()
            const user = await User.findOne({_id: req.session.user.id})
            let item = await Item.find(
                {seller: req.session.user.id, post:"Y", status:"Bid",
                $or: [ { seller: req.session.user.id }, { post:"N" }, { status:"Bid" }, { buyyer:{ $eq: null } }]}
            )
            let item2 = await Item.find(
                {seller: req.session.user.id, post:"N", status:"Bid", buyyer:{ $ne: null }}
            ).populate('buyyer')
            let item3 = await Item.find(
                {seller: req.session.user.id, post:"N", status:"Mengirim"}
            ).populate('buyyer')
            let item4 = await Item.find(
                {seller: req.session.user.id, post:"N", status:"Selesai"}
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
                item,
                item2,
                item3,
                item4,
                expedition
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    viewCreateItem: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            const categoryModel = await Category.find()
            const user = await User.findOne({_id: req.session.user.id})
            res.render('client/addItem/index',{
                user,
                id: req.session.user.id,
                name : user.name,
                email: user.email,
                balance: user.balance,
                categoryModel,
                alert
            })
        } catch (err) {
            console.log(err)
        }
    },
    sendItem: async(req, res)=>{
        try {
            const {id} = req.params
            const {expedition, receiptNumber} = req.body
            console.log(expedition)
            let receipt = await Invoice({
                expedition, item:id, receiptNumber
            })
            await receipt.save()
            await Item.findOneAndUpdate({_id:id},{status:"Mengirim"})
            res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    },
    createItem: async(req, res)=>{
        try {  
            const {name, desc, category, price, limit, condition} = req.body
            const seller = req.session.user.id
            if(req.file){
                if(name.length > 0){
                    if(desc.length > 0){
                        if(category != ""){
                            if(price>0){
                                if(limit == '3 hari'||limit == '7 hari'||limit == '14 hari'||limit == '21 hari'||limit == '28 hari'){
                                    if(condition == "Baru" || condition == "Bekas"){
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
                                        req.flash('alertMessage', "Berhasil melelang barang")
                                        req.flash('alertStatus', "success")
                                        res.redirect("/")
                                    }else{
                                        req.flash('alertMessage', "Kondisi barang hasur diisi")
                                        req.flash('alertStatus', "danger")
                                        res.redirect("/shop/sellitem")
                                    }
                                }else{
                                    req.flash('alertMessage', "Rentang waktu pelelangan hasur diisi")
                                    req.flash('alertStatus', "danger")
                                    res.redirect("/shop/sellitem")
                                }
                            }else{
                                req.flash('alertMessage', "Harga harus diisi")
                                req.flash('alertStatus', "danger")
                                res.redirect("/shop/sellitem")
                            }
                        }else{
                            req.flash('alertMessage', "Kategori harus dipilih")
                            req.flash('alertStatus', "danger")
                            res.redirect("/shop/sellitem")
                        }
                    }else{
                        req.flash('alertMessage', "Deskripsi barang hasur diisi")
                        req.flash('alertStatus', "danger")
                        res.redirect("/shop/sellitem")
                    }
                }else{
                    req.flash('alertMessage', "Nama barang hasur diisi")
                    req.flash('alertStatus', "danger")
                    res.redirect("/shop/sellitem")
                }
            }else{
                req.flash('alertMessage', "Gambar harus diisi")
                req.flash('alertStatus', "danger")
                res.redirect("/shop/sellitem")
            }
        } catch (err) {
            console.log(err)
        }
    },
}