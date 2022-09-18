//const express = require('express');
const db = require('../DB/dataBase');
const { ObjectId } = require('mongodb');

//getAllUsers
exports.getAll=async function getAll(req, res){
  const user = await db.getDB().collection("User").find().toArray();
  res.send(user);
}
//getUserByID
exports.getById=async function getById(req, res){
  const id = req.params.id;
  const user = await db.getDB().collection("User").findOne( ObjectId(id));
 res.send(`get user ${user} 😆`)
}
//updateUser
exports.put=async function put(req, res){
  const userToUpdate = req.body;
  console.log(userToUpdate,"userToUpdate");
  const {name, id, email }= userToUpdate;
  
  const filter = {_id: ObjectId(req.params.id) };
  console.log(filter, "filter");
  const doc = {$set: {name:name, id:id, email:email} };
  const user= await db.getDB().collection("User").updateOne(filter, doc);
  res.send(`user ${user} updated!😊`)
}
//addUser
exports.post=async function post(req, res){
  debugger
  if(req.body){
    debugger
    const user = req.body;
    const {name, id, email }=user;
    const doc = {name:name, id:id, email:email};
    const inserted= await db.getDB().collection("User").insertOne(doc);
    res.send(req.body)
  }
};
//deleteUser
exports.remove=async function remove(req, res){
  const user= await db.getDB().collection("User").deleteOne({_id: ObjectId(req.params.id) });
  res.send(`delete user ${user} 😒`)
}
