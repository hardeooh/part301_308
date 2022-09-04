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
  name: {
    type: 'String',
    minLength: 4,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  number: {
    type: 'String',
    minLength: 6,
    required: true,
    validate: {
      validator: (v) => {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
    message: props => `${props.value} is not a valid number!`
    },
    required: [true, 'User phone number required']
    }
  })

personSchema.set('toJSON', {
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)