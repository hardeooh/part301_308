 
const { getAll, getInfo, getId, deleteId } = require('./callback')
const express = require('express')
const app = express()
const PORT = 3001


app.get('/api/persons', getAll)
app.get('/info',getInfo)
app.get('/api/persons/:id',getId)
app.delete('/api/persons/:id',deleteId)




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})