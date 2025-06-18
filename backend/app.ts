import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

import redisService from './config/redis.config'
import SocketService from './config/socketIo.config'
// REDIS SOCKET.IO
import { createAdapter } from '@socket.io/redis-adapter'
import { createServer } from 'https'
import { Server } from 'socket.io'
// API ROUTES
import ChatApi from './api/chat/chat'
import FriendsApi from './api/friends/friends'
import PostApi from './api/post/post'
import ModifyPostApi from './api/post/modify/modify'
import UserDataApi from './api/user/userData'
import UserApi from './api/user/user'

class App {
   public app: Application
   private server: ReturnType<typeof createServer>
   private io: Server
   private socketController: SocketService
   private accessLogStream: fs.WriteStream

   constructor() {
      this.app = express()
      this.server = createServer(this.app)
      this.io = new Server(this.server, {
         adapter: createAdapter(redisService.client, redisService.subClient),
         cors: {
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST'],
            credentials: true,
         },
      })
      this.socketController = new SocketService(this.io)
      this.accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

      this.configureApp()
      this.configureAPIroutes()
      this.configureSockets()
   }

   private async connectDB(): Promise<void> {
      try {
         const DB_CONNECTION = process.env.MONGO_CONNECTION_STRING || ''
         mongoose.set('strictQuery', true)
         const connection = await mongoose.connect(DB_CONNECTION)
         console.log(`MongoDB connected: ${connection.connection.host}`)
      } catch (error) {
         console.log(error)
         process.exit(1)
      }
   }

   private configureApp(): void {
      this.app.use(express.json())
      this.app.use(helmet())
      this.app.use(cookieParser())
      this.app.use(bodyParser.json())
      this.app.use(morgan('combined', { stream: this.accessLogStream }))
      this.app.use(
         cors({
            credentials: true,
            origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:6060'],
         })
      )
   }

   private configureAPIroutes(): void {
      this.app.use('/api/user', new UserDataApi().router)
      this.app.use('/api/auth', new UserApi().router)
      this.app.use('/api/friends', new FriendsApi(this.socketController).router)
      this.app.use('/api/chat', new ChatApi().router)
      this.app.use('/api/post', new PostApi(this.socketController).router)
      this.app.use('/api/post/edit', new ModifyPostApi().router)
   }

   private configureSockets(): void {
      this.socketController.initializeSocketHandlers()
   }

   public async start(port: string | number): Promise<void> {
      await redisService.connect() // Connect to Redis before starting the server
      await this.connectDB()
      this.app.listen(port, () => {
         console.log(`The app started on port: ${port}`)
      })
   }
}

export default new App()
