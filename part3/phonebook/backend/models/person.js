import mongoose from 'mongoose'
import 'dotenv/config'

const URI = process.env.MONGO_DB_URI

mongoose.connect(URI)
  .then(result => {
    console.log(`Connecting to ${URI}`)
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB: ${error.message}`)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (doc, retPerson) => {
    retPerson.id = retPerson._id.toString()
    delete retPerson._id
    delete retPerson.__v
  }
})

export default mongoose.model('Person', personSchema)