const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const TodoModel = mongoose.model('Todo', {
  text: String,
})

app.use('/', express.static('./public'))
app.use(express.json())

app.get('/api/todo', async (req, res) => {
  const itemList = await TodoModel.find()

  res.send({itemList})
})

app.post('/api/todo', async (req, res) => {
  await TodoModel.create(req.body)
  res.send({succes: true})
})

app.listen(3000, () => console.log('http://localhost:3000'))
