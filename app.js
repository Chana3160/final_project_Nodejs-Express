
const db = require('./DB/mongoose')
const user = require('./Routs/User');
const product = require('./Routs/Product');
const order = require('./Routs/Orders');
const category = require ('./Routs/Category')
const logger = require('./Log/logger')
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

db.connect();

app.use(express.static('Static'))
app.use(express.json());


app.use('/api/category', category);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/User', user);

app.use((err,req,res,next) => {
    if(process.env.ENVIROMENT== "development")
    logger.error(err.message);
    res.status(500).send('oooooof Something broke! 😒')
})

app.use((req,res) => {
    
    res.status(404).sendFile(path.join( __dirname, './Static/html/404.html'));
})
// const nDate = new Date().toLocaleString('en-US', {
//     timeZone: 'Israel'
//   });
//   console.log(nDate);

logger.error('error😳😵🥴');
app.listen(port, () => logger.info(`Hello server, we are running on ${port}`))
