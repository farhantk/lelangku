const User = require('../user/model')

module.exports={
    index: async(req, res)=>{
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                res.status(200).json({
                    data: result
                })
                
            } catch (err) {
                console.log(err)
            }
        });
    },
    topup: async(req, res)=>{
        var addbalance =  req.body
        //const temp = parseInt(Object.values(addbalance))
        const temp = parseInt(addbalance.balance)
        User.findOneAndUpdate({
            _id: req.session.user.id
        }, {$inc:{balance:temp}}, (err, result)=>{
            try {
                res.status(200).json({
                    data:result
                })
            } catch (error) {
                console.log(error)
            }
        })
        
    }
}