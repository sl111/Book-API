/*
we are a company tat handles book publications
1)book ->ISBN,title,author[],language,pub date, num pages,category[]

2)authors -> name,id,books []

3)publications(who publih)-> name,id,books[]

database, build api to manage
url->request and get data

REQUIREMENTS:
BOOK:
1)GET
***need API to get all books 
***API for specific book
***API to get a list of books based on category
API to get a list of book based on author [task]

2)POST
***New book

3)PUT
***update book details
***update/add new author

4)DELETE
delete a book
delete a author from a book

/-------------------------------------/

AUTHOR:
1)GET
***API to get all authors
API to get speicifc author [task]
***API to get list of authors based on book

2)POST
***new author

3)PUT
author details[task] //use id and update name

4)DELETE
delete an author itself

/-------------------------------------/

PUBLICATION:
1)GET
***API to get all publication
API to get speicifc publication [task]
API to get list of publications based on book[task]

2)POST
***add new publication

3)PUT
update pub details [task]//use id ofpub and update name of pub
update new book to a publication

4)DELETE
delete a book from publication
delete a publication
*/


