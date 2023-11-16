import { Book } from '../model/database.model'
import { Request, Response } from 'express'

const BookController = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      const books = await Book.find()
      res
        .status(200)
        .json({ data: { count: books.length, books: books }, success: true })
    } catch (error) {
      res.status(500).json({ data: error, success: false })
    }
  },
  getBookById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const book = await Book.findById(id)
      if (!book) {
        res.status(404).json({ data: book, success: false })
      } else {
        res.status(200).json({ data: book, success: true })
      }
    } catch (error) {
      res.status(500).json({ data: error, success: false })
    }
  },
  createBook: async (req: Request, res: Response) => {
    const { title, author, publishYear } = req.body
    try {
      if (!author || !publishYear || !title) {
        res
          .status(400)
          .json({ data: 'All fields are required', success: false })
      } else {
        const result = await Book.create({ title, author, publishYear })
        res.status(200).json({ data: result, success: true })
      }
    } catch (error) {
      res.status(500).json({ data: error, success: false })
    }
  },
  editBook: async (req: Request, res: Response) => {
    const { title, author, publishYear } = req.body
    const editDetails = { title, author, publishYear }
    const { id } = req.params
    try {
      if (author || publishYear || title) {
        const result = await Book.findByIdAndUpdate(id, editDetails)
        if (!result) {
          res.status(404).json({ data: 'Not Book Found', success: false })
        } else {
          res.status(200).json({ data: result, success: true })
        }
      }
    } catch (error) {
      res.status(500).json({ data: error, success: false })
    }
  },
  deleteBook: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const result = await Book.findByIdAndDelete(id)
      if (!result) {
        res.status(404).json({ data: 'Not Book Found', success: false })
      } else {
        res.status(200).json({ data: result, success: true })
      }
    } catch (error) {
      res.status(500).json({ data: error, success: false })
    }
  },
}

export default BookController
