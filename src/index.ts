import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Done' })
})
app.listen(8081, () => {
  console.log('listening on port 8081')
})
