import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './utils/config.js'
import logger from './utils/logger.js'
import 'express-async-errors';
import middleware from './utils/middleware.js'
import blogRouter from './controllers/blogs.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

const app = express()
mongoose.set('strictQuery', false)

try {
    logger.info('connecting to ', config.MONGODB_URI)
    const connect = await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to mongoDB ',connect.connection.host)
} catch (error) {
    logger.error('error connecting to mongoDB ',error.message)
}

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtracter)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', middleware.userExtracter, blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app