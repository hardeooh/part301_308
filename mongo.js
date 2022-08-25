const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://admin:${password}@t3t4.2eodtuo.mongodb.net/?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

const Person = mongoose.model('Person', phoneSchema)

Person
  .find({})
  .then((persons) => {
    persons.map(e=>console.log(e))
  })
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: newName,
      date: new Date(),
      number: newNumber,
    })

    return person.save()
  })
  .then((res) => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))