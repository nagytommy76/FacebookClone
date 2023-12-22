import { Application } from 'express'
import { createServer } from 'https'
import { Server } from 'socket.io'

export interface IOnlineFriends {
   userId: string
   socketId: string
}

export const initSocketIO = (app: Application) => {
   const httpsServer = createServer(app)
   const io = new Server(httpsServer, {
      cors: {
         origin: ['http://localhost:3000'],
         methods: ['GET', 'POST'],
         credentials: true,
      },
   })

   io.listen(3001)

   // Ezzel megvannak az online userek -> tudok válogatni köztük ki kapjon üzit (AKIT ÉRINT -> POST LIKE)
   let onlineFriends: IOnlineFriends[] = []

   const addNewUser = (userId: string, socketId: string) => {
      !onlineFriends.some((user) => user.userId === userId) && onlineFriends.push({ userId, socketId })
   }
   const removeUser = (socketId: string) => {
      onlineFriends = onlineFriends.filter((user) => user.socketId !== socketId)
   }
   const getUser = (userId: string) => {
      return onlineFriends.find((user) => user.userId === userId)
   }

   io.on('connection', (socket) => {
      socket.on('newUser', (userId) => {
         addNewUser(userId, socket.id)
      })
      io.on('disconnect', () => removeUser(socket.id))
   })
   return { io, onlineFriends, getUser }
}
