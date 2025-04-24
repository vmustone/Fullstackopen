require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const Contact = require('./models/Contact')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'

const customMorganMiddleware = (request, response, next) => {
  if (request.method === 'POST') {
    return (morgan(customFormat)(request, response, next))
  }
  return (morgan('tiny')(request, response, next))
}

app.use(customMorganMiddleware)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(result => {
    if(result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()

  Contact.find({}).then(result => {
    const data = `
            <p>Phonebook has info for ${result.length} people<p>
            <p>${date.toDateString()} ${date.toTimeString()}</p>
        `
    response.send(data)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Contact({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})