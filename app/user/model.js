const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const HASH_ROUND = 10

let userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'nama harus diisi'],
    maxlength :[225, "panjang nama harus antara 3 - 225 karakter"],
    minlength :[3, "panjang nama harus antara 3 - 225 karakter"]
  },
  username: {
    type: String,
    require: [true, 'nama harus diisi'],
    maxlength :[225, "panjang username harus antara 3 - 225 karakter"],
    minlength :[3, "panjang username harus antara 3 - 225 karakter"]
  },
  password: {
    type: String,
    require: [true, 'kata sandi harus diisi'],
    maxlength :[225, "panjang password maksimal 225 karakter"],
  },
  balance: {
    type: Number,
    default: 0
  },
  store: {
    type: String,
    enum: ['Y', 'N'],
    default: 'N'
  },
  image: {
    type : String,
    default: "images/userIcon.png"
  },
  phoneNumber: {
    type: String,
    require: [true, 'nomor telpon harus diisi'],
    maxlength :[13, "panjang nomor telpon harus antara 9 - 13 karakter"],
    minlength :[9, "panjang nomor telpon harus antara 9 - 13 karakter"]
  },
  province: {
      type: String,
      require: [true, 'Provinsi harus diisi'],
      default: ''
  },
  city: {
      type: String,
      require: [true, 'Kota harus diisi'],
      default: ''
  },
  district: {
      type: String,
      require: [true, 'Kecamatan harus diisi'],
      default: ''
  },
  ward: {
      type: String,
      require: [true, 'Kelurahan harus diisi'],
      default: ''
  },
  postalCode: {
      type: String,
      require: [true, 'Kode pos harus diisi'],
      default: ''
  },
  fullAddr: {
      type: String,
      require: [true, 'Alamat lengkap harus diisi'],
      default: ''
  },

}, { timestamps: true })

userSchema.path('email').validate(async function (value){
    try {
        const checkEmail = await this.model('User').countDocuments({ email: value })
        return !checkEmail
    } catch (error) {
        throw error
    }
}, attr => {`${attr.value} sudah terdaftar`})

userSchema.pre('save', function (next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})


module.exports = mongoose.model('User', userSchema)
