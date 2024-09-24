const express = require ('express');
const app=express();

const dotenv=require('dotenv');
const path = require('path');

const cors = require('cors');


const connectDatabase = require('./config/connectDatabase');

dotenv.config({path: path.join(__dirname,'config','config.env')})

// const corsOperation={
//     origin:process.env.APPLICATION_URL,
//     methods:'GET,HEAD,PUT,PATCH,POST,DELETE'
// };
const Products =require('./routes/products');
const orders =require('./routes/order');

connectDatabase();

app.use(express.json())

app.use(cors());

app.use('/api/v1/',Products);
app.use('/api/v1/',orders);

app.listen(process.env.PORT,()=>{

    console.log(`Server Listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)

})