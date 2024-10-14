import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors'
const app = express()

app.use(json())
app.use(cors())

morgan.token('data', (req, res)=> {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1> Hello there </h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:personId', (request, response) => {
    const id = request.params.personId
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(404).end()
    }

    response.json(person)
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body

    if (!(name && number && name.trim() && number.trim())) {
        return response
            .status(400)
            .json({ error: "name or number cannot be empty" });
    }

    if (persons.some(p => p.name === name.trim())) {
        return response
            .status(400)
            .json({ error: "name must be unique" });
    }

    const newPerson = {
        id: Math.floor(Math.random() * 999999),
        name: name.trim(),
        number: number.trim()
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.delete('/api/persons/:personId', (request, response) => {
    const id = request.params.personId
    const person = persons.find(p => p.id === id)
    if (!person) {
        return response.status(404).end()
    }

    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(
        `
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${Date()}</p>        
        `
    )
})

const port = 3001
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})