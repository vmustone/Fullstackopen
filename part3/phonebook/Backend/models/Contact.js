const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.connect(url)
    
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Contact', phonebookSchema)