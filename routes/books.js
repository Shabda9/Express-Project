const express = require('express');
const router = express.Router();
const Book = require('../model/model');
router.use(express.static("public"));

router.get('/', async (req, res) => {
  try {
    const booksList = await Book.find();
    console.log("booksList", booksList)
    res.render('books-list', { booksList: booksList })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/new', (req, res) => {
  res.render('index')
})

router.delete('/all', async (req, res) => {
  try {
    const deleteMessage = await Book.deleteMany({});
    res.status(200).json(deleteMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const data = new Book({
    name: req.body.name,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    pages: req.body.pages
  })

  console.log('data', data)

  try {
    await data.save();
    res.status(200).redirect('/books')

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Specifies whether to return the updated data in the body or not
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleteMessage = await Book.deleteOne({});
    res.status(200).json(deleteMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
