const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set('useFindAndModify', false)

const TodoModel = mongoose.model('Todo', {
  text: String,
  completed: Boolean,
})

app.use('/', express.static('./public'))
app.use(express.json())

app.get('/api/todo', async (req, res) => {
  const itemList = await TodoModel.find()

  res.send({itemList})
})

app.put('/api/todo', async (req, res, next) => {
  if (!req.body._id) {
    res.status(400).send({
      succes: false,
      reason: 'no todo _id',
    })

    return
  }

  await TodoModel.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { completed: req.body.completed } }
  ).exec()

  res.send({succes: true})
})

app.post('/api/todo', async (req, res) => {
  const newRecord = await TodoModel.create(req.body)

  res.send({
    succes: true,
    newRecordId: newRecord._id,
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))
