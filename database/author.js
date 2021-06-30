const mongoose=require("mongoose");

//creating a book schema
const AuthorSchema=mongoose.Schema({
    id: Number,
    name:String,
    books: [String],
});

//Create a book model
const AuthorModel=mongoose.model("authors",AuthorSchema);

//to use in other files:
module.exports=AuthorModel;