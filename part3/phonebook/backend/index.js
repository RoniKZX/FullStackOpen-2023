import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import People from './models/person.js'

const app = express()

app.use(express.json()) // Activate the express json-parser
app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req, res) => JSON.stringify(req.body, undefined, ' '))
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms
Data: :data \n`))

let people = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  People.find({}).then(people => res.json(people))
})

app.get('/api/persons/:id', (req, res) => {
  People.findById(req.params.id).then(person => res.json(person))
})

app.get('/info', (req, res) => {
  const html = `
  <p>Phonebook has info for ${people.length} people</p>
  <p>${Date()}</p>
  `

  res.send(html)
})

app.delete('/api/persons/:id', (req, res, next) => {
  People.findByIdAndRemove(req.params.id).then(result => res.status(204).end()).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "name is missing" })
  } else if (people.find(p => p.name === req.body.name)) {
    return res.status(409).json({ error: "name must be unique" })
  }

  if (!req.body.number) {
    return res.status(400).json({ error: "number is missing" })
  }

  const newPerson = new People({ name: req.body.name, number: req.body.number })

  newPerson.save().then(savedPerson => res.json(savedPerson))
})

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
