import type { Application } from 'express'
import { createServer } from 'https'
import { Server, Socket } from 'socket.io'

import { getAcceptedFriendsModel } from '@/controllers/friends/getFriends'
import { Types } from 'mongoose'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

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
      if (userId !== '' && !onlineFriends.some((user) => user.userId === userId)) {
         onlineFriends.push({ userId, socketId })
      }
   }
   const removeUser = (
      socketId: string,
      socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
   ) => {
      let loggedInUserId: string | null = null
      onlineFriends = onlineFriends.filter((user) => {
         if (user.socketId !== socketId) {
            return true
         } else {
            loggedInUserId = user.userId
            return false
         }
      })
      socket.broadcast.emit('offline:friends', { userId: loggedInUserId })
   }
   const getUser = (userId: string) => {
      return onlineFriends.find((user) => user.userId === userId)
   }

   socketIo.on('connection', (socket) => {
      socket.on('newUser', async (userId) => {
         addNewUser(userId, socket.id)
         socket.broadcast.emit('online:friends', { userId, socketId: socket.id })
      })

      socket.on('join_room', (args: { chatRoomId: string[] }) => {
         socket.join(args.chatRoomId)
      })

      socket.on('disconnect', () => {
         removeUser(socket.id, socket)
      })
   })
   return { io: socketIo, onlineFriends, getUser }
}
