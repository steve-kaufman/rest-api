const mongoose = require('mongoose')

const authenticationSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: { type: mongoose.Types.ObjectId, required: true },
  jwt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Authentication', authenticationSchema)
