const mongoose = require('mongoose')
const product = require('./Product')
const User = require('./User')


const ordersSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: String
        },
        amount: {
            type: Number
        },
        products: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quentity: {
                    type: Number
                }
            }]
    }, 
    {timestamps: true}
)

module.exports = mongoose.model('Orders', ordersSchema)