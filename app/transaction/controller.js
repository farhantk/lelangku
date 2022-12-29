const Item = require('../item/model')
const User = require('../user/model')
const multer = require('multer')
const date = require('date-and-time');
const os = require('os')
module.exports={
    viewTransaction: async(req,res)=>{
        try {
            const user = await User.findOne({_id: req.session.user.id})
            const item = await Item.find({buyyer:req.session.user.id})
            res.render('client/transaction/index', {
                user,
                item,
                id:req.session.user.id,
                title: "Transaction",
                username : user.username,
                name : user.name,
                balance: user.balance
            })
        } catch (err) {
            console.log(err)
        }
    },
    finishItem: async(req, res)=>{
        try {
            const {id} = req.params
            await Item.findOneAndUpdate({
                _id:id},{status:"Selesai"})
            res.redirect('/user/transaction')
        } catch (err) {
            console.log(err)
        }
    }
}
