import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors'
import Person from './models/person.js';
const app = express()

app.use(json())
app.use(cors())
// app.use(express.static('dist'))

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', async (request, response, next) => {
   try {
     const people = await Person.find({})
     return response.json(people)
   } catch (error) {
    next(error)
   }
})

app.get('/api/persons/:personId', async (request, response, next) => {
    try {
        const id = request.params.personId
        const person = await Person.findById(id)

        if (!person) {
            return response
                .status(404)
                .json({ error: "Contact not found" })
        }

        return response.json(person)
    } catch (error) {
        next(error)
    }
})

app.post('/api/persons', async (request, response, next) => {
    try {
        const { name, number } = request.body
    
        if (!(name && number && name.trim() && number.trim())) {
            return response
                .status(400)
                .json({ error: "name or number cannot be empty" });
        }
    
        const newPerson = new Person({
            name: name.trim(),
            number: number.trim()
        })
    
        await newPerson.save()
        return response.json(newPerson)
    } catch (error) {
        next(error)
    }
})

app.put('/api/persons/:personId', async (request, response, next) => {
    try {
        const id = request.params.personId
        const { number } = request.body

        const person = await Person.findById(id)
        if (!person) {
            return response
                .status(404)
                .json({ error: "Contact not found" })
        }

        person.number = number
        await person.save()

        const people = await Person.find({})

        return response
            .status(200)
            .json(people)
    } catch (error) {
        next(error)
    }
})

app.delete('/api/persons/:personId', async (request, response, next) => {
    try {
        const id = request.params.personId

        const person = await Person.findById(id)
        if (!person) {
            return response
                .status(404)
                .json({ error: "Contact not found" })
        }

        await Person.findByIdAndDelete(id)

        return response
            .status(200)
            .json({ message: `${person.name} [${person.number}] has been deleted successfully` })
    } catch (error) {
        next(error)
    }
})

app.get('/api/info', async (request, response) => {
    try {
        const count = await Person.countDocuments() // replace 'persons' with your actual collection name
        response.send(
            `
                <p>Phonebook has info for ${count} people</p>
                <p>${new Date()}</p>        
            `
        )
    } catch {
        response.status(500).send({ error: 'Unable to retrieve data' })
    }
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})