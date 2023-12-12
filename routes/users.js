const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const User = require('../model/user-model');

router.get('/', async (req, res) => {
  try {
    const usersList = await User.find();
    console.log("usersList", usersList)
    res.json(usersList)
    // res.render('books-list', { booksList: booksList })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/all', async (req, res) => {
  try {
    const deleteMessage = await User.deleteMany({});
    res.status(200).json(deleteMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = await User.create({
      userName,
      password,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
    });

    // Create token
    console.log(process.env.TOKEN_SECRET)
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    console.log("token", token)

    user.token = token;
    res.status(201).json(user);
  } catch (error) {

  }
  // const data = new User({
  //   userName: req.body.userName,
  //   password: req.body.password,
  //   email: req.body.email,
  //   isAdmin: req.body.isAdmin || false
  // })

  // console.log('data', data)

  // try {
  //   response = await data.save();
  //   res.status(200).json(response)

  // } catch (error) {
  //   res.status(400).json({ message: error.message })
  // }
})

//Get by ID Method
router.get('/:id', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.status(200).json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Specifies whether to return the updated data in the body or not
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleteMessage = await User.deleteOne({"_id": req.params.id});
    res.status(200).json(deleteMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
