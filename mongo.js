const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@t3t4.2eodtuo.mongodb.net/?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

const Person = mongoose.model('Person', phoneSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: 'Kloe Dester',
      date: new Date(),
      number: '310-029-3021',
    })

    return Note.find({})
  })
  .then((res) => {
    res.forEach((e) => {
      console.log(e)
    })
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))