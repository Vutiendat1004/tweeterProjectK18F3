import express, { NextFunction, Request, Response } from 'express'
const app = express()
app.use(express.json())
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const port = 3000
databaseService.connect()
app.get('/', (req, res) => {
  res.send('hello world')
})

//fix lại thành user luôn cho dỡ hack não

//nên api lúc này là http://localhost:3000/users/tweets

app.use('/users', usersRouter) //route handler

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})
