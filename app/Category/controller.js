const Category = require('../Category/model')

module.exports={
    index:async(req, res)=>{
        try {
            const category = await Category.find()
            res.render('admin/category/index', {
                title: 'Category', 
                category, 
                active: "category",
            })
        } catch (err) {
            console.log(err)
            res.redirect('/admin/category')
        }
    },
    actionCreate:async(req, res)=>{
        try {
            const {name} = req.body
            let category = await Category({name})
            await category.save()
            res.redirect('/admin/category')
        } catch (err) {
            console.log(err)
        }
    },
    actionEdit:async(req, res)=>{
        try {
            const {id} =  req.params
            const {name}= req.body
            await Category.findOneAndUpdate({
                _id:id
            }, {name})
            res.redirect('/admin/category')
        } catch (err) {
            console.log(err)
        }
    },
    actionDelete:async(req, res)=>{
        try {
            const {id} =  req.params
            await Category.findOneAndRemove({
                _id:id
            })
            res.redirect('/admin/category')
        } catch (err) {
            console.log(err)
        }
    },


}