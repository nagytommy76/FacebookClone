import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables before anything else
config({ path: resolve(__dirname, '../.env') })

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = process.env.REDIS_PORT
