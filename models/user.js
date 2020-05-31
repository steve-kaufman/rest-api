const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true, select: false }
})

module.exports = mongoose.model('User', userSchema)
