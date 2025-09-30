import { io } from 'socket.io-client'

const PROD_URL = 'https://facebookclonebackendbuild-production.up.railway.app'
const DEV_URL = process.env.NEXT_PUBLIC_DEV_SOCKET_URL || 'http://localhost:5050'

export const socket = io(PROD_URL, {
   withCredentials: true,
   autoConnect: false,
})
