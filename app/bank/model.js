const mongoose = require('mongoose')

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    default: "LelangKu"
  },
  bankName: {
    type: String,
    require: [true, 'Nama bank harus diisi']
  },
  accountNumber: {
    type: String,
    require: [true, 'Nomor rekening bank harus diisi']
  },

}, { timestamps: true })

module.exports = mongoose.model('Bank', bankSchema)