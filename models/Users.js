const { Schema, model } = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 30,
        trim: true,
        required: true
    },
    email: {
        type: String,
        maxlength: 30,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    balance: Number,
    income: Number,
    expence: Number,
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ]
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User