const mongoose = require('mongoose')

let itemSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama barang harus diisi'],
    maxlength :[225, "panjang nama harus antara 3 - 225 karakter"],
    minlength :[3, "panjang nama harus antara 3 - 225 karakter"]
  },
  desc: {
    type: String,
    require: [true, 'Deskripsi barang harus diisi'],
    maxlength :[260],
    minlength :[3, "panjang deskripsi harus antara 3 - 225 karakter"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  price: {
    type: Number,
    require: [true, 'Harga awal harus diisi']
  },
  bidCount: {
    type: Number,
    default: 0
  },
  post: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
    require: true
  },
  condition: {
    type: String,
    enum: ['Baru', 'Bekas'],
    default: 'Baru',
    require: true
  },
  status: {
    type: String,
    enum: ['Bid', 'Selesai', 'Mengirim'],
    default: 'Bid',
    require: true
  },
  timeLimit: {
    type: Date,
    require: [true, 'batas waktu harus diisi']
  },
  image: {type : String},
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  buyyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },


}, { timestamps: true })


module.exports = mongoose.model('Item', itemSchema)
