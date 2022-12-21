const Item = require('../item/model')
const User = require('../user/model')

module.exports={
    index: async(req,res)=>{
        try {
            const item = await Item.find().populate('buyyer').populate('seller')
            res.render('admin/dashboard/index', {
                title: "Transaction",
                active: "dashboard",
                item
            })
        } catch (err) {
            console.log(err)
        }
    }
}
