const mongoose = require('mongoose');

// Define a schema for a Book
const userSchema = new mongoose.Schema({
  userName: {
      required: true,
      type: String
  },
  password: {
      required: true,
      type: String
  },
  isAdmin: {
    required: false,
    type: Boolean,
    default: false
  },
  email: {
    required: true,
    type: String,
  },
  token: {
    required: false,
    type: String
  }
})

// Exporting the User schema, first param is the name of the collection(singular) and second in the schema
module.exports = mongoose.model('User', userSchema)
