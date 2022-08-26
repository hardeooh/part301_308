const { default: mongoose } = require('mongoose')
const Person = require('./models/person')

let notes = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

getAll = (req,res) => {
  Person.find({}).then(person=>{
    res.json(person)
  })
}

getInfo = (req,res) => {
  const count = notes.length
  const currentDate = new Date()
  res.send(`<h1>The phonebook has ${count} records</h1><br><h2>${currentDate}</h2>`)
}

getId = (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else {
        response.status(404).send({error: "Cannot find ID"})
      }
    })
    .catch(error=>{
      console.log(error);
      response.status(400).send({ error: 'malformatted id' })
    })
}

deleteId = (req,res) => {
  const id = req.params.id
  console.log(id)
  console.log(mongoose.Types.ObjectId.isValid(req.params.id))
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204)
    })
    .catch(error=>console.log(error))
}

addPerson = (req,res) => {
  const body = req.body
  console.log(req.body)
  if(body.name === undefined){
    return res.status(400).json({error: 'content missing'})
  }
  const person = new Person({
    name: body.name,
    date: new Date(),
    number: body.number,
  })

  person.save().then(person=>{
    res.json(person)
  })
}

module.exports = { getAll,getInfo,getId, deleteId, addPerson }