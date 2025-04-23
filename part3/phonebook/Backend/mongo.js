const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('Please provide a name and number as arguments: node mongo.js <password> <name> <number> or node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vmustonen:${password}@phonebook.kmvvp0k.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Phonebook`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', phonebookSchema)

const person = new Contact({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5) {
  person.save().then(result => {
    console.log('added', result.name, 'number', result.number, 'to phonebook')
    mongoose.connection.close()
  })
}