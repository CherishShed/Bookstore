import express from 'express'
import 'dotenv/config'
import { Book } from './model/database.model'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/api', async (req, res) => {
  Book.find()
    .then(result => {
      res.json({ message: 'succesful', result })
    })
    .catch(err => {
      res.json({ message: 'an error occurred', error: err })
    })
})
app.get('/api/:id', async (req, res) => {
  const { id } = req.params
  Book.findById(id)
    .then(result => {
      res.json({ message: 'succesful', result })
    })
    .catch(err => {
      res.json({ message: 'an error occurred', error: err })
    })
})
app.post('/api/books', async (req, res) => {
  const { name, number } = req.body
  const newBook = new Book({ name, number })
  newBook
    .save()
    .then(result => {
      res.json({ message: 'succesful', result })
    })
    .catch(err => {
      res.json({ message: 'an error occurred', error: err })
    })
})
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
