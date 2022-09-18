const mongoose = require('mongoose');
const category = require('./Category');
const Schama = mongoose.Schema;

const productSchema = new Schama(
    {
        categoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        name:{
            type: String,  
            required: true
        },
        price:{
            type:Number,
            required: true
        },
        desc:{
            type:String
        },
        imageUrl:{
            type:String
        }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model('Product', productSchema)