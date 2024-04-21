// Importar los módulos necesarios
const { response } = require("express");
const Book = require("../models/book.model.js");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode.js");

//Función para obtener todos los libros. Recupera los libros de la base datos y los devuelve en formato JSON.
const getBooks = async (request, response) => {
  try {
    const books = await Book.find();
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: books,
    });
  } catch (error) {
    response.status(404).json({ message: HTTPSTATUSCODE[400] });
  }
};

// Función para obtener un libro por ID. Recupera el libro y devuelve un JSON.
const getBook = async (request, response) => {
  try {
    const id = request.params.id;
    const book = await Book.findById(id);
    response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(404).json({ message: `No se ha encontrado ${id}` });
  }
};

// Función para obtener un libro por autor. Recupera el libro y devuelve un JSON.
const getBooksByAuthor = async (request, response) => {
  try {
    const author = request.params.author;
    const books = await Book.find({ author: author });
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response
      .status(404)
      .json({ message: `No se han encontrado libros del autor ${author}` });
  }
};
// Función para obtener por género. Recupera el libro y devuelve un JSON.
const getBooksByGenre = async (request, response) => {
  try {
    const author = request.params.author;
    const books = await Book.find({ genre: genre });
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response
      .status(404)
      .json({ message: `No se han encontrado libros del autor ${genre}` });
  }
};

// Función para crear un nuevo libro. Guarda el libro en la base datos y devuelve una respuesta JSON.
const createBook = async (request, response) => {
  const book = new Book(request.body);
  try {
    await book.save();
    response
      .status(201)
      .json({ message: "El libro fue creado con éxito", book: book });
  } catch (error) {
    console.log(error.message);
    response
      .status(400)
      .json({ message: `Bad request, compruebe su petición` });
  }
};
// Función para actualizar el libro. Busca el libro por ID y le introduce nuevos datos.
const updateBook = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const book = await Book.findByIdAndUpdate(id, body, { new: true });
    if (!book) {
      return response.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    response.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: book,
    });
  } catch (error) {
    console.error(error.message);
    response.status(400).json({ message: error.message });
  }
};

//Función para borrar libros. Encuentra el libro por ID y lo borra.
const deleteBook = async (request, response) => {
  try {
    const id = request.params.id;

    const book = await Book.findByIdAndDelete(id);
    response.status(200).json({ message: "Se borró el libro" });
  } catch (error) {
    console.log(error.message);
    response.status(404).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getBooksByAuthor,
  getBooksByGenre,
};
