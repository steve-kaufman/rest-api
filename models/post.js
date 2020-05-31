const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  content: String,
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema)
