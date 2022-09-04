require('dotenv').config()
const { getAll, getInfo, getId, deleteId, addPerson, updatePerson } = require('./callback')
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


//Routes
app.get('/api/persons', getAll)
app.put('/api/persons', updatePerson)
app.get('/info', getInfo)
app.get('/api/persons/:id', getId)
app.delete('/api/persons/:id', deleteId)
app.post('/api/persons/', addPerson)

//unknown endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler
const errorHandler = (error, request, response, next) => {
  console.error('error Handler is here', error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})