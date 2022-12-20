const User = require('../user/model')
const Category = require('../Category/model')
const Item = require('../item/model')


module.exports={
    index: async(req, res)=>{
        try {
            const user = await User.findOne({_id: req.session.user.id})
            const category = await Category.find()
            //let category = await Category.find({})
            const item =  await Item.find().populate('seller')
            res.render('client/landingpage/index', {
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
                category,
                item
            })
        } catch (err) {
            console.log(err)
        }
    }
}