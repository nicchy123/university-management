import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import { userRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middleWares/globalErrorHandlers'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoutes)

app.use(globalErrorHandler)

export default app
