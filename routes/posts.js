const express = require('express')
const mongoose = require('mongoose')

const Post = require('../models/post')

const router = express.Router()

// Find: GET '/posts'
router.get('/', async (req, res) => {
  const posts = await Post.find().exec()

  res.status(200).json({
    success: true,
    data: posts
  })
})

// Create: POST '/posts'
router.post('/', async (req, res) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  })

  try {
    await post.save()
    res.status(201).json({
      success: true,
      data: post
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

// Get: GET '/posts/:id'
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id).exec()

  if (!post) {
    res.status(404).json({
      success: false,
      error: `A post with id ${id} does not exist`
    })
    return
  }

  res.status(200).json({
    success: true,
    data: post
  })
})

// Patch: PATCH '/posts/:id'
router.patch('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const query = Post.findByIdAndUpdate(id, req.body, { new: true })
    const post = await query.exec()
    res.status(200).json({
      success: true,
      data: post
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

// Delete: DELETE '/posts/:id'
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      data: post
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    })
  }
})

module.exports = router
