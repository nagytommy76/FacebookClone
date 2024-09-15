import express, { Application, NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import connectDB from './config/connectDB'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import initSocketIO from './config/socketIo'

import morgan from 'morgan'
import path, { resolve } from 'path'
import fs from 'fs'

config({ path: resolve(__dirname, './.env') })
const app: Application = express()

const PORT = process.env.PORT || 5050
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

connectDB().then(async () => {
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

initSocketIO(app).then(({ getUserById, getUser, io, onlineFriends, pubClient }) => {
   //https://dev.to/omardiaa48/how-to-make-realtime-apis-with-nodejs-and-reactjs-using-socket-io-6ja
   app.use((request: Request, response: Response, next: NextFunction) => {
      console.log('APP:USE')
      request.ioSocket = io
      request.onlineFriends = onlineFriends
      request.getUser = getUser
      request.getUserById = getUserById
      request.redisClient = pubClient as any
      next()
   })
})

app.use('/api/user', require('./api/user/userData'))
app.use('/api/auth', require('./api/user/user'))
app.use('/api/friends', require('./api/friends/friends'))
app.use('/api/chat', require('./api/chat/chat'))

app.use('/api/post', require('./api/post/post'))
app.use('/api/post/edit', require('./api/post/modify/modify'))
