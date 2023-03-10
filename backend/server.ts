import express, { Application } from 'express'
import { config } from 'dotenv'
import connectDB from './config/connectDB'
import cors from 'cors'
import bodyParser from 'body-parser'

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
      origin: ['http://localhost:3000'],
   })
)
app.use(bodyParser.json())
app.use(morgan('combined', { stream: accessLogStream }))

app.use('/api/auth', require('./api/user/user'))
