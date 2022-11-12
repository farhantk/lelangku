const mongoose = require('mongoose')

let expeditionSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Nama ekspedisi harus diisi']
    }
})
module.exports=mongoose.model('Expedition', expeditionSchema)