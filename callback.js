const express = require('express')
const app = express()
app.set('view engine','ejs')
const notes = [
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
  res.json(notes)
}

getInfo = (req,res) => {
  const count = notes.length
  const currentDate = new Date()
  res.send(`<h1>The phonebook has ${count} records</h1><br><h2>${currentDate}</h2>`)
}

getId = (req,res) => {
  const id = req.params.id
  const note = notes.find(e=>e.id===Number(id))
  if(note){
    res.json(note)
    console.log(note)
  } else {
    res.status(404).end() 
  }
}

deleteId = (req,res) => {
  const id = req.params.id
  notes = notes.filter(e=>e.id===Number(id))
  res.status(204).end()
}

module.exports = { getAll,getInfo,getId, deleteId }