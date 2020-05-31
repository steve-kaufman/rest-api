const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const postsRouter = require('./routes/posts')

/** Instantiate app and database connection */

// Port for app to listen on
const PORT = 3000

// Connect to MongoDB
const connectionString = 'mongodb://localhost:27017/rest-api'
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(connectionString, connectionOptions)
  .then(() => { console.log('Connected to Mongo') })
  .catch((err) => { console.error(err) })

// Instantiate app
const app = express()

// Enable json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up routes
app.use('/posts', postsRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
