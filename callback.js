const Person = require('./models/person')

getAll = (req,res,next) => {
  Person.find({})
  .then(person=>{
    res.json(person)
  })
  .catch(error=>{
    next(error)
  })
}

getInfo = (req,res) => {
  let count = 0
  Person.find({})
    .then((person) => {
      count = person.length
      const currentDate = new Date()
      res.send(`<h1>The phonebook has ${count} records</h1><br><h2>${currentDate}</h2>`)
    })
    .catch((error)=>{
      next(error)
    })

}

getId = (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else {
        response.status(404).send({error: "Cannot find ID"})
      }
    })
    .catch(error=>{
      next(error)
    })
}

deleteId = (req,res,next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((message) => {
      return res.status(204).send(message)
    })
    .catch(error=>{
      next(error)
    })
}

addPerson = (req,res,next) => {
  const body = req.body

  // let phoneNumber = body['number'].split('').filter(e=>'123456789'.includes(e)).join('')
  // if(phoneNumber.length === 6){
  //   phoneNumber = `${phoneNumber.slice(0,3)}-${phoneNumber.slice(3)}`
  // }

  console.log(phoneNumber)

  const person = new Person({
    name: body.name,
    date: new Date(),
    number: phoneNumber,

  })

  person.save()
    .then(person=>{
      res.json(person)
    })
    .catch(error=>{
      console.log("GET error")
      next(error);
    })
}

updatePerson = (req,res,next)=>{
    const body = req.body
    const person = {
      name: body.name,
      date: new Date(),
      number: body.number,
    }
    console.log(body.name, body.number)
    Person.findOneAndUpdate({name: body.name}, {number: body.number})
      .then((person) => {
        res.json(person);
      })
      .catch((error)=>{
        next(error)
      })

  }




module.exports = { getAll,getInfo,getId, deleteId, addPerson, updatePerson }