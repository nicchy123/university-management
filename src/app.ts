import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import userRouter from '../src/app/modules/users/users.route'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)

export default app
