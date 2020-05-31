const express = require('express')
const mongoose = require('mongoose')

const User = require('../models/user')
const hashPassword = require('../middleware/hashPassword')

const router = express.Router()

// Find: GET '/users'
router.get('/', async (req, res) => {
  // Query for username if provided in request body
  const usernameQuery = (req.body.username)
    ? { username: req.body.username }
    : undefined

  const users = await User.find(usernameQuery).exec()

  res.status(200).json({
    success: true,
    data: users
  })
})

// Create: POST '/users'
router.post('/', async (req, res) => {
  const { username, password } = req.body

  const hashedPasswd = hashPassword(password)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    password: hashedPasswd
  })

  try {
    await user.save()
    res.status(201).json({
      success: true,
      data: user
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

// Get: GET '/users/:id'
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id).exec()

  if (!user) {
    res.status(404).json({
      success: false,
      error: `A post with id ${id} does not exist`
    })
    return
  }

  res.status(200).json({
    success: true,
    data: user
  })
})

// Patch: PATCH '/users/:id'
router.patch('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const query = User.findByIdAndUpdate(id, req.body, { new: true })
    const user = await query.exec()
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

// Delete: DELETE '/users/:id'
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

module.exports = router
