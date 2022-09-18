const { type } = require("express/lib/response");
const { MongoCredentials } = require("mongodb");
const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const addressSchama = new Schama({
    city: {
        type: String,
        min: 3
    },
    street: {
        type: String,
    },
    numberHome: {
        type: Number,
        min: 1
    }
})

const userSchama = new Schama({
    fullName: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    Address: { type: [addressSchama] },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group"
    }
}, {timestamps: true})


const group = new Schama({
    name: {
        type: String,
        required: true
    }
},
    { timestamps: true })

userSchama.virtual('userOrders', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'userId'
}
);

userSchama.set('toJSON', { virtuals: true })

module.exports = mongoose.model('user', userSchama)

