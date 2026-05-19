import express from 'express'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
