const User = require('../user/model')

module.exports={
    index: async(req, res)=>{
        User.findOne({_id: req.session.user.id}, (err, result) => {
            try {
                res.render('client/TopUp/index')
                res.status(200).json({
                    data: result
                })
                res.redirect('/')
                
            } catch (err) {
                console.log(err)
            }
        });
    },
    topup: async(req, res)=>{
        var addbalance =  req.body
        console.log(addbalance)
        const temp = parseInt(Object.values(addbalance))
        //const temp = parseInt(addbalance)
        console.log(temp)
        User.findOneAndUpdate({
            _id: req.session.user.id
        }, {$inc:{balance:temp}}, (err, result)=>{
            try {
                res.redirect('/')
                res.status(200).json({
                    data:result
                })
            } catch (error) {
                res.redirect('/')
            }
        })
        
    }
}