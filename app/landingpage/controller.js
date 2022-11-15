const User = require('../user/model')

module.exports={
    index: async(req, res)=>{
        try {
            res.render('client/landingpage/index')
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
}