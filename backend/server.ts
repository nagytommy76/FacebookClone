import express, { Application, NextFunction, Response } from 'express'
import { config } from 'dotenv'
import connectDB from './config/connectDB'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { initSocketIO } from './config/socketIo'
import type { ISocketRequest } from './types'

import morgan from 'morgan'
import path, { resolve } from 'path'
import fs from 'fs'

config({ path: resolve(__dirname, './.env') })
const app: Application = express()

const PORT = process.env.PORT || 5050
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`The app started: ${PORT}`)
   })
})

app.use(
   cors({
      credentials: true,
      origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:6060'],
   })
)

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))

initSocketIO(app).then(({ getUser, io, onlineFriends }) => {
   app.use((request: ISocketRequest, response: Response, next: NextFunction) => {
      request.ioSocket = io
      request.onlineFriends = onlineFriends
      request.getUser = getUser
      next()
   })
})
app.use('/api/user', require('./api/user/userData'))
app.use('/api/auth', require('./api/user/user'))
app.use('/api/friends', require('./api/friends/friends'))
app.use('/api/chat', require('./api/chat/chat'))

app.use('/api/post', require('./api/post/post'))
app.use('/api/post/edit', require('./api/post/modify/modify'))
