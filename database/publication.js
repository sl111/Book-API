const mongoose=require("mongoose");

//creating a book schema
const PublicationSchema=mongoose.Schema({
    id: Number,
    name:String,
    books: [String],
});

//Create a book model
const PublicationModel=mongoose.model("publications",PublicationSchema);

//to use in other files:
module.exports=PublicationModel;