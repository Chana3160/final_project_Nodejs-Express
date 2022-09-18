const db = require('../DB/dataBase');
const { ObjectId } = require('mongodb');
//const { use } = require('../Routs/User');

//getAllProductS
//doing
exports.getAll=async function getAll(req, res){
  const product = await db.getDB().collection("Product").find().toArray();
  res.send(product);
}
//getProductByID
exports.getById=async function getById(req, res){
  const id = req.params.id;
  const product = await db.getDB().collection("Product").findOne( ObjectId(id));
 res.send(`get product ${product} 😆`)
}
//updateProduct
exports.put=async function put(req, res){
  //debugger
  const productToUpdate = req.body;
  console.log(productToUpdate,"productToUpdate");
  //debugger
  const {name, id, email }= productToUpdate;
  
  const filter = {_id: ObjectId(req.params.id) };
  console.log(filter, "filter");
  const doc = {$set: {name:name, id:id, price:price} };
  const product= await db.getDB().collection("Product").updateOne(filter, doc);
  res.send(`user ${product} updated!😊`)
}
//addProduct
//doing
exports.post=async function post(req, res){
  debugger
  if(req.body){
    debugger
    const product = req.body;
    const {name, id, price }=product;
    const doc = {name:name, id:id, price:price};
    const inserted= await db.getDB().collection("Product").insertOne(doc);
    res.send(req.body)
  }
  
};
//deleteUser
exports.remove=async function remove(req, res)
{
  const id=req.params.id;
  const product= await db.getDB().collection("Product").deleteOne({_id: ObjectId(id) });
  res.send(`delete user ${product} 😒`)
}
