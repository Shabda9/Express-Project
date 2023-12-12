// Requiring dot env's configuration
require('dotenv').config();
const express = require('express')
const auth = require('./middleware/auth')

// Database
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const cors = require('cors')
const app = express()

// Set up CORS
app.use(cors({
  origin: true, // "true" will copy the domain of the request back
  // to the reply. If you need more control than this
  // use a function.

  credentials: true, // This MUST be "true" if your endpoint is
  // authenticated via either a session cookie
  // or Authorization header. Otherwise the
  // browser will block the response.

  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
  // pre-flight OPTIONS requests
}));


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

app.get('/', auth, (req, res) => {
  res.send("hello now, This is from server.js")
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.use(auth)
const booksRouter = require('./routes/books');
app.use('/books', booksRouter)

app.listen(port, () => {
  console.log(`Server started at ${port}`)
});
