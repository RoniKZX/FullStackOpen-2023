import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import People from './models/person.js'

const app = express()

app.use(express.json()) // Activate the express json-parser
app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req) => JSON.stringify(req.body, undefined, ' '))
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms
Data: :data \n`))

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  People.find({}).then(people => res.json(people))
})

app.get('/api/persons/:id', (req, res) => {
  People.findById(req.params.id)
    .then(person => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (req, res) => {
  People.countDocuments()
    .then(counted => {
      const html = `
        <p>Phonebook has info for ${counted} people</p>
        <p>${Date()}</p>
        `

      res.send(html)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  People.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }

  if (!req.body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  const newPerson = new People({ name: req.body.name, number: req.body.number })

  newPerson.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }

  People.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError')
    return res.status(400).send({ error: 'malformatted id' })

  else if (err.name === 'ValidationError')
    return res.status(400).json({ error: err.message })

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
