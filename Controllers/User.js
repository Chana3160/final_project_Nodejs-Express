const userModel = require('../models/User');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const logger = require('../Log/logger');



module.exports.getNewUser= async function (req, res, next) {
    try{
        const toget = await userModel.find().sort({createdAt:-1}).limit(1);
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}


module.exports.get = async function (req, res, next) {
    try {
        logger.info("before db");
        const toget = await userModel.find();
        logger.info("after db");
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}

module.exports.getOneUser = async function (req, res, next) {
    try {
        const email = req.params.email;
        const password = req.params.password;

        const user = await userModel.findOne({ email: email, password: password });

        await res.send(user);
    }
    catch (error) {
        next(error)
    }
}

module.exports.addUser = async function (req, res, next) {
    try {
        console.log(req.body, "req.body");
        const { fullName, email, password, Address, groupId } = req.body;
        let data = new userModel({
            fullName: fullName, email: email, password: password, Address: Address, groupId: groupId
        });
        const insertedUser = await data.save();
        res.send(insertedUser);
    }
    catch (error) {
        next(error)
    }
}

module.exports.updateUser = async function (req, res, next) {
    try {
        const user = req.body;
        const { address, fullName, email, password, groupId } = user;
        await userModel.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set:
                {
                    address: address,
                    fullName: fullName,
                    email: email,
                    password: password,
                    groupd: groupId
                }
            });
        res.send(`user by id ${req.params.id} update😊`)
    }
    catch (error) {
        next(error)
    }
}

module.exports.remove = async function (req, res, next) {
    try {    
        const email = req.params.email;
        const toDelete = await userModel.deleteOne({ email: email });
        await res.send(toDelete);
    }
    catch (error) {
        next(error)
    }
}

module.exports.userOrders = async function(req, res, next){
    try{
        const userId = req.params.id;
        const user = await userModel.findOne({ _id: ObjectId(userId)}).populate({path:'userOrders', select:'date amount products'});
      res.send(user);
    }
    catch(error){
        next(error)
    }
}





