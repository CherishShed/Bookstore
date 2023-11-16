import express from 'express'
import 'dotenv/config'
import BookController from './controllers/book.controller'
import cors from 'cors'
const app = express()
const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/api/books', BookController.getAllBooks)
app.get('/api/books/:id', BookController.getBookById)
app.post('/api/books', BookController.createBook)
app.put('/api/books/:id', BookController.editBook)
app.delete('/api/books/:id', BookController.deleteBook)
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
