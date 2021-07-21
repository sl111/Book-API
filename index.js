//search nodemon in goog, CMD:
//1) npm i nodemon
//2) npx nodemon index

//nodemon install! automatically restarts
require("dotenv").config();
//frame work
const express = require("express");
const mongoose=require("mongoose");


//initializing micr service routes
const Books=require("./API/Book"); 
const Authors=require("./API/Author");
const Publications =require("./API/Publication");


// initializing expree
const shapeAI=express();

//CONFIGURATIONS- making server use json data

shapeAI.use(express.json());
//establish data base conn
mongoose.connect(
  process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(()=>console.log("connection established!"));

//initializing micro services
shapeAI.use("/book",Books);
shapeAI.use("/author",Authors);
shapeAI.use("/publication",Publications);

// 

//start server
shapeAI.listen(3000,()=>console.log("server Running!"));

//talk to mongodb
//talk to us (js)
//MONGOOSE
//search mongoose -npm
/*accept js obj ,and asynchronous

//why schema?

mongodb is schemaless

mongoose helps u with validation(setup indepth validations), relationship with other data(user obj,post,feed,all data can be related eg:book related to author n publication)
mongoose is only for mongodb

mongoose model- represents document model of mongoDB.

in website, COLLECTIONS- indivual databases in nosql dtabase is collection, book author are document.

SCHEMA-> MODEL -> use them

*/