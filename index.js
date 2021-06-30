//search nodemon in goog, CMD:
//1) npm i nodemon
//2) npx nodemon index

//nodemon install! automatically restarts
require("dotenv").config();
//frame work
const express = require("express");
const mongoose=require("mongoose");

//database
const database=require("./database/index");

//models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");


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
/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/

// "/" ->root route , request for response
// getting all list of books array
shapeAI.get("/", (req, res) => {
    //hello change
    //find all books , condition mobgo will match and send all obj
    const getAllBooks=BookModel.find();
    return res.json( getAllBooks );
  });

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/

shapeAI.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  //if book not available:
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }
  
  return res.json({ book: getSpecificBook });
});

//CATEGORY

/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/

shapeAI.get("/c/:category", (req, res) => {
  const getSpecificBooks = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  //includes looks into everything in array if it has only strings or num,if match found true

  if (getSpecificBooks.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});



/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/author", (req, res) => {
  return res.json({ authors: database.authors });
}); 

/*
Route           /author
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/author/:isbn", (req, res) => {
  const getSpecificAuthors = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthors.length === 0) {
    return res.json({
      error: `No author found for the book ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthors });
});


/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/publications", (req, res) => {
  return res.json({ publications: database.publications });
});

//-------------------------------//

/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/

//using req body to add all elements
shapeAI.post("/book/new", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({ books: database.books, message: "book was added!" });
});
//wen running url in browser, it performs only GET 
//POSTMAN -> + ->paste url localhost:300-/bookpost/new-> raw->json

/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;
  database.authors.push(newAuthor);
  return res.json({ authors: database.authors, message: "author was added!" });
});


/*
Route           /publications/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/publications/new", (req, res) => {
  const { newPublication } = req.body;
  database.publications.push(newPublication);
  return res.json({ publications: database.publications, message: "publication was added!" });
});

/*
Route           /book/update/
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/book/update/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.bookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/book/author/update/:isbn", (req, res) => {
  // update the book database
  //pushing author id
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn)
      return book.authors.push(req.body.newAuthor);
  });

  // update the author database
  //pushing isbn
  database.authors.forEach((author) => {
    if (author.id === req.body.newAuthor)
      return author.books.push(req.params.isbn);
  });

  return res.json({
    books: database.books,
    authors: database.authors,
    message: "New author was added ",
  });
});

/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/publication/update/book/:isbn", (req, res) => {
  // update the publication database
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      // replacing the old publication with new
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});

//...................................//

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
shapeAI.delete("/book/delete/:isbn", (req, res) => {
  // if isbn doesnt match will be sent to const , matched->thrown out
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );

  //(book)=> isbn gett MERN,isbn gettin PYthon , ween they dont match update

  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});


/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
shapeAI.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  //forEach-> not deletin the whole database, jus modifying author
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.authors = newAuthorList;
      return;
    }
  });

  // update the author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      const newBooksList = author.books.filter(
        (book) => book !== req.params.isbn
      );

      author.books = newBooksList;
      return;
    }
  });

  return res.json({
    message: "author was deleted!!!!",
    book: database.books,
    author: database.authors,
  });
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

    // update book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = 0; // no publication available
        return;
      }
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
    });
  });

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