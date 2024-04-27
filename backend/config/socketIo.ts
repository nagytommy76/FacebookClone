import type { Application, NextFunction, Response } from 'express'
import { createServer } from 'https'
import { Server } from 'socket.io'
import { ISocketRequest } from 'types'

export interface IOnlineFriends {
   userId: string
   socketId: string
}

export const initSocketIO = (app: Application) => {
   const httpsServer = createServer(app)
   const socketIo = new Server(httpsServer, {
      cors: {
         origin: ['http://localhost:3000'],
         methods: ['GET', 'POST'],
         credentials: true,
      },
   })

   socketIo.listen(3001)
   // Ezzel megvannak az online userek -> tudok válogatni köztük ki kapjon üzit (AKIT ÉRINT -> POST LIKE)
   let onlineFriends: IOnlineFriends[] = []

   const addNewUser = (userId: string, socketId: string) => {
      if (!onlineFriends.some((user) => user.userId === userId)) {
         onlineFriends.push({ userId, socketId })
      }
   }
   const removeUser = (socketId: string) => {
      onlineFriends = onlineFriends.filter((user) => user.socketId !== socketId)
   }
   const getUser = (userId: string) => {
      return onlineFriends.find((user) => user.userId === userId)
   }

   socketIo.on('connection', (socket) => {
      socket.on('newUser', (userId) => {
         addNewUser(userId, socket.id)
      })

      socket.on('join_room', (args: { chatRoomId: string[] }) => {
         socket.join(args.chatRoomId)
      })

      socket.on('disconnect', () => {
         removeUser(socket.id)
      })
   })
   return { io: socketIo, onlineFriends, getUser }
}
