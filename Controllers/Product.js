const productModel = require('../models/Product');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports.getAll = async function (req, res, next) {
    try{
    const toget = await productModel.find();
    await res.send(toget);
}
catch(error){
    next(error)
}
}

module.exports.getOneProduct = async function (req, res, next) {
    try {
        const id =(req.params.id);
        const product = await productModel.find({ categoryId: id }).populate('categoryId')
        
        await res.send(product);
    }
    catch (error) {
        next(error)
    }
}


module.exports.addProduct = async function (req, res, next) {
    try {
        const { categoryId, name, price, desc, imageUrl } = req.body;
        let data = new productModel({
            categoryId: categoryId, name: name, price: price, desc: desc, imageUrl:imageUrl
        });
        const insertedProduct = await data.save();
        res.send(insertedProduct);
    }
    catch (error) {
        next(error)
    }
}

module.exports.updateProduct = async function (req, res, next) {
    try {
        const product = req.body;
        const { categoryId, name, price, desc, imageUrl } = product;
        await productModel.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set:
                {
                    categoryId: categoryId,
                    name: name,
                    price: price,
                    desc: desc,
                    imageUrl: imageUrl
                }
            });
        res.send(`product by id ${req.params.id} update😊`)
    }
    catch (error) {
        next(error)
    }
}

module.exports.remove = async function (req, res, next) {
    try {    
        const name = req.params.name;
        const toDelete = await productModel.deleteOne({ name: name });
        await res.send(toDelete);
    }
    catch (error) {
        next(error)
    }
}

