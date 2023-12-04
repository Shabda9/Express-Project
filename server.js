// Requiring dot env's configuration
require('dotenv').config();

const express = require('express')

// Database
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express()

database.on('error', (error) => {
  console.log('ERROR', error);
})

database.once('connected', () => {
  console.log('DATABASE CONNECTED');
})

app.set('view engine', 'ejs')
const port = 3000

// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.send("hello now, This is from server.js")
})

const booksRouter = require('./routes/books');
app.use('/books', booksRouter)


app.listen(port, () => {
  console.log(`Server started at ${port}`)
});
