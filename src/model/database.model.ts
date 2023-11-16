import mongoose, { Document } from 'mongoose'
import 'dotenv/config'

mongoose
  .connect(process.env.CONNECTION_STRING!)
  .then(() => {
    console.log('Connection Succeeded')
  })
  .catch(err => {
    console.log(`An error occurred ${err}`)
  })
export interface bookType extends Document {
  name: string
  number: number
}
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
})

export const Book = mongoose.model<bookType>('Book', bookSchema)
