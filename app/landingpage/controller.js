const User = require('../user/model')
//let Category = require('../Category/model')


module.exports={
    index: async(req, res)=>{
        try {
            const user = await User.findOne({_id: req.session.user.id})
            //let category = await Category.find({})
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
                //category
            })
        } catch (err) {
            console.log(err)
        }
    }
}