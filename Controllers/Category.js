const categoryModel = require('../models/Category');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');



module.exports.get = async function (req, res, next) {
    try {
        const toget = await categoryModel.find();
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}

module.exports.getOneCategory = async function (req, res, next) {
    try {
        const id = req.params.id;
        const category = await categoryModel.findOne({ _id: id });

        await res.send(category);
    }
    catch (error) {
        next(error)
    }
}

module.exports.addCategory = async function (req, res, next) {
    try {
        const { name } = req.body;
        let data = new categoryModel({
            name:name
        });
        const insertedCategory = await data.save();
        res.send(insertedCategory);
    }
    catch (error) {
        next(error)
    }
}


module.exports.updateCategory = async function (req, res, next) {
    try {
        const category = req.body;
        const { name } = category;
        await categoryModel.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set:
                {
                   name:name
                }
            });
        res.send(`category by id ${req.params.id} update😊`)
    }
    catch (error) {
        next(error)
    }
}
module.exports.remove = async function (req, res, next) {
    try {    
        const name = req.params.name;
        const toDelete = await categoryModel.deleteOne({ name: name });
        await res.send(toDelete);
    }
    catch (error) {
        next(error)
    }
}
