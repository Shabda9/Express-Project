const mongoose = require('mongoose');

// Define a schema for a Book
const bookSchema = new mongoose.Schema({
  name: {
      required: true,
      type: String
  },
  author: {
      required: true,
      type: String
  },
  publishedDate: {
    required: false,
    type: String
  },
  pages: {
    required: false,
    type: Number,
    default: 0
  }
})

// Exporting the Book schema, first param is the name of the collection(singular) and second in the schema
module.exports = mongoose.model('Book', bookSchema)
