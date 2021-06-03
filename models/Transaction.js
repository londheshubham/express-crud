const mongoose = require('mongoose')

const TransactionSchema =  mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: [true,'Please add some text']
    },
    number:{
        type: Number,
        required: [true,'Please add a positive or negative number']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date
    }
})

module.exports = mongoose.model('Transaction',TransactionSchema)