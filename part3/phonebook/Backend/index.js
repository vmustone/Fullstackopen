require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const Contact = require('./models/Contact')
const app = express();

app.use(express.static('dist'))
app.use(express.json());

morgan.token('body', (request) => JSON.stringify(request.body));

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';


const customMorganMiddleware = (request, response, next) => {
  if (request.method === 'POST') {
    return (morgan(customFormat)(request, response, next));
  }
  return (morgan('tiny')(request, response, next));
};

app.use(customMorganMiddleware);

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(result => {
        response.json(result);
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Contact.findById(id).then(result => {
        response.json(result);
    })
  })

app.get('/info', (request, response) => {
    const date = new Date();
    
    Contact.find({}).then(result => {
        const data = `
            <p>Phonebook has info for ${result.length} people<p>
            <p>${date.toDateString()} ${date.toTimeString()}</p>
        `;
        response.send(data);
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' });
    }

    const person = new Contact({
        name: body.name,
        number: body.number,
    });

    person.save().then(result => {
        response.status(201).json(result);
    });
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Contact.findByIdAndDelete(id).then(result => {
        if (!result) {
            return response.status(404).json({ error: 'Person not found' });
        }
        response.status(204).end();
    });
})

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;

    Contact.findByIdAndUpdate(id, body, { new: true })
        .then(updatedPerson => {
            if (!updatedPerson) {
                return response.status(404).json({ error: 'Person not found' });
            }
            response.json(updatedPerson);
        });
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})