const User = require('../user/model')

module.exports={
    index: async(req, res)=>{
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                res.render('client/landingpage/index', {
                    name : result.name,
                    email: result.email,
                    balance: result.balance,
                    phoneNumber: result.phoneNumber,
                    province: result.province,
                    city: result.city,
                    district: result.district,
                    ward: result.ward,
                    postalCode: result.postalCode,
                    fullAddr: result.fullAddr,
                    image: result.image,
                })
            } catch (err) {
                console.log(err)
            }
        });
    }
}