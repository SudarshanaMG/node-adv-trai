const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')
const app = express()

mongoose.connect('mongodb://localhost:27017/notesapi')
app.use(express.json())

app.post('/notes', async (req, res) => {
  const note = new Note(req.body)
  await note.save()
  res.send(note)
})

app.get('/notes', async (req, res) => {
  const notes = await Note.find()
  res.send(notes)
})

app.patch('/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(note)
})

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.send({ status: 'deleted' })
})

app.listen(3000)