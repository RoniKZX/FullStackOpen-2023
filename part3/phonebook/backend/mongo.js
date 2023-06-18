import mongoose from "mongoose"
import "dotenv/config"

if (process.argv.length < 3) {
  console.log('give a password as an argument')
  process.exit(1)
}

const DB_USER = process.env.MONGO_DB_USER
const DB_PASS = process.argv[2]
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@phonebookcluster.nfgjwzn.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(DB_URI)
  .then(res => console.log('Connected successfully to database'))
  .catch(error => console.log(error.message))

const personSchema = { name: String, number: String }
const Person = mongoose.model('Person', personSchema)

if (DB_PASS && process.argv.length < 4) {
  Person.find({})
    .then(people => {
      console.log('phonebook:')
      people.forEach(person => {
        console.log(person.name, person.number)
      })

      mongoose.connection.close().then(res => {
        console.log('Connection closed')
        process.exit(0)
      })
    })
}
else {
  const person = new Person({ name: process.argv[3], number: process.argv[4] })

  person.save().then(res => {
    console.log(`added ${person.name} ${person.number} to phonebook`)

    mongoose.connection.close().then(res => {
      console.log('Connection closed')
      process.exit(0)
    })
  })
}


