import mongoose, { Document } from 'mongoose'
import 'dotenv/config'

mongoose
  .connect(process.env.CONNECTION_STRING!, {
    dbName: 'main',
  })
  .then(() => {
    console.log('Connection Succeeded')
  })
  .catch(err => {
    console.log(`An error occurred ${err}`)
  })

mongoose.connection.on('error', err => {
  console.log(`An error occurred: ${err},\n...reconnecting`)
  mongoose
    .connect(process.env.CONNECTION_STRING!, {
      dbName: 'main',
    })
    .then(() => {
      console.log('Connection Succeeded')
    })
    .catch(err => {
      console.log(`An error occurred ${err}`)
    })
})
export interface bookType extends Document {
  title: string
  author: string
  publishYear: string
}
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { timestamps: true }
)

export const Book = mongoose.model<bookType>('Book', bookSchema)
