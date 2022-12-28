const User = require('../user/model')
const Category = require('../Category/model')
const Item = require('../item/model')


module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            const user = await User.findOne({_id: req.session.user.id})
            const category = await Category.find()
            //let category = await Category.find({})
            const item =  await Item.find({post:"Y"}).populate('seller')
            res.render('client/landingpage/index', {
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
                category,
                item,
                alert
            })
        } catch (err) {
            console.log(err)
        }
    }
}