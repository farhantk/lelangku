const Expedition = require('./model')

module.exports={
    index:async(req, res)=>{
        try {
            const expedition = await Expedition.find()
            res.render('admin/expedition/index', {
                title: 'Expedition', 
                expedition, 
                active: "expedition",
            })
        } catch (err) {
            console.log(err)
            res.redirect('/admin/expedition')
        }
    },
    actionCreate:async(req, res)=>{
        try {
            const {name} = req.body
            let expedition = await Expedition({name})
            await expedition.save()
            res.redirect('/admin/expedition')
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit:async(req, res)=>{
        try {
            const {id} =  req.params
            const {name}= req.body
            await Expedition.findOneAndUpdate({
                _id:id
            }, {name})
            res.redirect('/admin/expedition')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete:async(req, res)=>{
        try {
            const {id} =  req.params
            await Expedition.findOneAndRemove({
                _id:id
            })
            res.redirect('/admin/expedition')
        } catch (err) {
            console.log(err)
        }
    },


}