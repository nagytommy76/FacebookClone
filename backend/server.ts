import express, { Application } from 'express'
import { config } from 'dotenv'
import connectDB from './config/connectDB'
import cors from 'cors'

import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

config()
const app: Application = express()
const PORT = process.env.PORT || 5050
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`The app started: ${PORT}`)
   })
})

app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))

app.use('/api/user', require('./api/user/user'))
