const express = require('express');
const cors = require('cors');
const app = express();



const bookRouter = express.Router()
const{getBooks,getBook, createBook, updateBook, deleteBook, getBooksByAuthor, getBooksByGenre} = require('../controllers/book.controller');

bookRouter.get ('/', getBooks);
bookRouter.get ('/:id', getBook);
bookRouter.get('/author/:author');
bookRouter.get ('genre/:genre');
bookRouter.post ('/', createBook);
bookRouter.patch ('/:id',updateBook);
bookRouter.delete ('/:id', deleteBook);



module.exports = bookRouter;


