require('dotenv').config()
const { getAll, getInfo, getId, deleteId, addPerson } = require('./callback')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const uuid = require('node-uuid')
const app = express()
const mongoose = require('mongoose')
const password = process.argv[2]

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('id', function getId (req) {
  return req.id
})

app.use(assignId)
app.use(morgan(':id :method :url :response-time'))

function assignId (req, res, next) {
  req.id = uuid.v4()
  next()
}

//Mongoose COnnection
const url = `mongodb+srv://admin:${a05654563}@t3t4.2eodtuo.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)
const phoneSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
})

const Person = mongoose.model('Person', phoneSchema)

//Routes
app.get('/api/persons', (req,res) => {
  Person.find({}).then(person=>{
    res.json(person)
  })
  
})
app.get('/info', getInfo)
app.get('/api/persons/:id', getId)
app.delete('/api/persons/:id', deleteId)
app.post('/api/persons/', addPerson)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})