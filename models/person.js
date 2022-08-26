const mongoose = require('mongoose')
const url = process.env.MONGO_URI

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

module.exports = mongoose.model('Person', personSchema)