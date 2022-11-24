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
        var data =  req.body
        //const temp = parseInt(Object.values(addbalance))
        console.log(data.addbalance)
        User.findOneAndUpdate({
            _id: req.session.user.id
        }, {$inc:{balance:temp}})
        
    }
}