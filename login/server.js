const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authdb')
const User = mongoose.model('User', { email: String, password: String })

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 8)
  const user = new User({ email: req.body.email, password: hashed })
  await user.save()
  res.send(user)
})

app.post('/users/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const isMatch = await bcrypt.compare(req.body.password, user.password)
  const token = jwt.sign({ _id: user._id }, 'secret')
  res.send({ token })
})

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  const decoded = jwt.verify(token, 'secret')
  req.user = decoded
  next()
}

app.get('/profile', auth, (req, res) => {
  res.send({ msg: 'Protected route accessed' })
})

app.listen(3000)