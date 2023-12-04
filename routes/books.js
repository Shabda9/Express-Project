const express = require('express');
const router = express.Router();
const Book = require('../model/model');
router.use(express.static("public"));

router.get('/', async (req,res) => {
  try {
    const booksList = await Book.find();
    console.log("booksList", booksList)
    res.render('books-list', {booksList: booksList})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/new', (req,res) => {
  res.render('index')
})

router.delete('/all', async (req, res) => {
  try {
    const deleteMessage = await Book.deleteMany({});
    res.status(200).json(deleteMessage)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/:id', (req, res) => {
  res.send('Getting Books from ID')
})

router.post('/', async (req, res) => {
  const data = new Book({
    name: req.body.name,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    pages: req.body.pages
  })

  console.log('data',data)

  try {
    await data.save();
    res.status(200).redirect('/books')

  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.delete('/:id', (req, res) => {
  res.send('Delete by Books')
})

module.exports = router
