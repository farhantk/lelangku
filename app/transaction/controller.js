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
    }
}
