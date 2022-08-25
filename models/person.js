const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)

console.log('connecting to', url)

// const url = `mongodb+srv://admin:${password}@t3t4.2eodtuo.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)
  .then((result) => {
    console.log('connecting to', url);
  })
  .catch((error) => {
    console.log('error connecting to mongoDB', error.message);
  })

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)