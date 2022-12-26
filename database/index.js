const mongoose = require('mongoose')

mongoose.connection.on('open', () => {
  console.log('mongodb successfully connected')
})
mongoose.connection.on('error', (err) => {
  console.log('mongodb feiler ', err.message)
})

const startDbConnection = () => {
  mongoose.connect(
    `${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  )
}

module.exports = startDbConnection
