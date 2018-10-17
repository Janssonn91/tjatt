/* 
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;
let express= require('express');

// Middleware to get body fro posts
app.use(express.json({extended: false}));

// Setting upp REST routes 
// (Please note that "a Book" here is not really a book
// but a Mongoose model + setting up routes)
// const Book = require('./classes/Book.class');
// new Book(app);
// const Author = require('./classes/Author.class');
// new Author(app);

