const mongoose=require("mongoose");
//ALWAYS MAINTAIN 1 SCHEME - 1 FILE
//creating a book schema
const BookSchema=mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
      }, // required
    title:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10,
      },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

//Create a book model
const BookModel=mongoose.model("books",BookSchema);

//model->doc model of mongodb , bt which doc to use?

//to use in other files:
module.exports=BookModel;