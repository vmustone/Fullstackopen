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
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{7,12}$/.test(v)
      },
      message: props => `${props.value} Correct format 09-1234556 or 040-22334455!`
    },
    required: true
  }
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Contact', phonebookSchema)