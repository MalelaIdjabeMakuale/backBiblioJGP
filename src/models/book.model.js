const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[0-9a-zA-Zàáéíóúñâêîôăûãñõçäöü.,\-_ ]+$/,
  },


  author: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Zàáéíóúñâêîèăôśûñńãõçäöü.,\-_ ]+$/,
  },

  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Zàáéíóúñâêîñôûãõçäöăü.,\-_ ]+$/,
  },
  
  publisher: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Zàáéíóúñăâêîñôûãõçäöü.,\-_ ]+$/,
  },

  country: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Zàáéíóúñăâêîñôûãõçäöü.,\-_ ]+$/,
  },


  language: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Zàáéíóúñâêîñăôûãõçäöü.,\-_ ]+$/,
  },
  publication_year: {
    type: Number,
    required: true,
  },

  pages: {
    type: Number,
    required: true,
    min: 1,
  },

  isBorrowed: {
    type: Boolean,
    default: false,
  },


  borrowedBy: { type: String },

  borrowedTo: { type: String },

  cover: {type:String}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
