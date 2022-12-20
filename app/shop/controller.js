const User = require('../user/model')
const Item = require('../item/model')
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
}