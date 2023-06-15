import express from 'express'
import morgan from 'morgan'
const app = express()

app.use(express.json()) // Activate the express json-parser

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
  res.json(people)
})

app.get('/api/persons/:id', (req, res) => {
  const person = people.find(p => p.id === Number(req.params.id))

  if (person)
    res.json(person)
  else
    res.status(404).end()
})

app.get('/info', (req, res) => {
  const html = `
  <p>Phonebook has info for ${people.length} people</p>
  <p>${Date()}</p>
  `

  res.send(html)
})

app.delete('/api/persons/:id', (req, res) => {
  people = people.filter(p => p.id !== Number(req.params.id))

  res.status(204).end()
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

  const newPerson = {
    id: Math.floor((Math.random() * 10000)),
    name: req.body.name,
    number: req.body.number,
  }

  people = people.concat(newPerson)
  res.json(people)
})

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
