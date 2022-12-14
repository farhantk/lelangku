const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Category harus diisi']
    }
})
module.exports=mongoose.model.Category || mongoose.model('Category', categorySchema)