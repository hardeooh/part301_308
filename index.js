 
const { getAll, getInfo, getId, deleteId, addPerson } = require('./callback')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const uuid = require('node-uuid')
const app = express()
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

app.get('/api/persons', getAll)
app.get('/info', getInfo)
app.get('/api/persons/:id', getId)
app.delete('/api/persons/:id', deleteId)
app.post('/api/persons/', addPerson)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})