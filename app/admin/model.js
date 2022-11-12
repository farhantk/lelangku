const mongoose = require('mongoose')

let adminSchema = mongoose.Schema({
    email:{
        type: String,
        require:[true, 'Email harus diisi']
    },
    username:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:[true, 'Kata sandi harus diisi']
    },
})

module.exports = mongoose.model('Admin', adminSchema)