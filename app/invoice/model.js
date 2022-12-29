const mongoose = require('mongoose')

let invoiceSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    expedition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expedition'
    },
    receiptNumber: {
        type: Number,
        require: true
    },

}, { timestamps: true })


module.exports = mongoose.model('Invoice', invoiceSchema)