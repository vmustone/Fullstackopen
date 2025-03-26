const PORT = 3001;
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    }
];

morgan.token('body', (request) => JSON.stringify(request.body));

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';

// Luodaan middleware-funktio, joka loggaa vain POST-pyynnöt
const customMorganMiddleware = (request, response, next) => {
  if (request.method === 'POST') {
    return (morgan(customFormat)(request, response, next));
  }
  return (morgan('tiny')(request, response, next));
};

app.use(customMorganMiddleware);

const generateId = () => {
    let id;
    do {
      id = Math.floor(Math.random() * 10000);
    } while (persons.some(person => person.id === id));
    return id;
  };
  
const errorMessage = (body) => {
    if (!body.name) {
        return { status: 400, message: "Name missing" };
    }
    if (!body.number) {
        return { status: 400, message: "Number missing" };
    }
    if (persons.some(person => person.name === body.name)) {
        return { status: 409, message: "Name must be unique" };
    }
    return null;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    const error = errorMessage(body);

    if (error) {
        return response.status(error.status).json({ error: error.message });
    }

    const content = {
        id: generateId(),
        name: body.name,
        number: body.number
    };

    persons = persons.concat(content);
    response.status(201).json(content);
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    const now = new Date();
    const date = now.toDateString();
    const time = now.toTimeString();
    
    const data = `
        <p>Phonebook has info for ${persons.length} people<p>
        <p>${date} ${time}</p>
    `;

    response.send(data);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
    
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const originalLength = persons.length; 

    persons = persons.filter(person => person.id !== id);
    if (originalLength === persons.length) {
        response.status(404).end();
    } else {
        response.status(204).end();
    }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})