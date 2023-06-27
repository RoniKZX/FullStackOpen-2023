import mongoose from 'mongoose'
import 'dotenv/config'

const URI = process.env.MONGO_DB_URI

mongoose.connect(URI)
  .then(() => {
    console.log(`Connecting to ${URI}`)
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB: ${error.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (number) => {
        return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(number)
      },
      message: () => `Invalid number format:
                            DD-DDDDDD...
                            DDD-DDDDD...`,
      required: [true, 'User phone number required!']
    }
  },
})

personSchema.set('toJSON', {
  transform: (doc, retPerson) => {
    retPerson.id = retPerson._id.toString()
    delete retPerson._id
    delete retPerson.__v
  }
})

export default mongoose.model('Person', personSchema)