import type { Application } from 'express'
import { createServer } from 'https'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

import type { IMessage } from '../models/chat/Types'

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

   // https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-rooms-work-in-socket-io
   socketIo.on('connection', (socket) => {
      socket.on('newUser', async (userId) => {
         addNewUser(userId, socket.id)
         socket.broadcast.emit('online:friends', { userId, socketId: socket.id })
      })

      socket.on('join_room', (args: { chatRoomId: string[] }) => {
         socket.join(args.chatRoomId)
      })

      // CHAT ---------------------------------------------------------------------

      socket.on('chat:createChat', (args) => {
         let foundUserSocketId = onlineFriends.find((user) => user.userId === args.toUserId)?.socketId
         // socket.broadcast.to(args.createdChatId).emit('chat:createChatResponse', args)
         if (foundUserSocketId) socket.broadcast.to(foundUserSocketId).emit('chat:createChatResponse', args)
      })

      socket.on('chat:typing', (args: { isTyping: boolean; chatMsgLength: number; chatId: string }) =>
         socket.broadcast.to(args.chatId).emit('chat:typingResponse', args)
      )

      socket.on('chat:sendMsg', (args: { addedMessage: IMessage[]; foundChatId: string }) => {
         socket.broadcast.to(args.foundChatId).emit('chat:endTypingResponse')
         socket.broadcast.to(args.foundChatId).emit('chat:sendMsgResponse', args)
      })

      socket.on('chat:deleteMsg', (args) => {
         socket.broadcast.to(args.chatId).emit('chat:deleteMsgResponse', args)
      })

      socket.on('chat:addMessageReaction', (args) => {
         socket.broadcast.to(args.chatId).emit('chat:addMessageReactionResponse', args)
      })

      socket.on('chat:deleteLike', (args) => {
         socket.broadcast.to(args.chatId).emit('chat:deleteLikeResponse', args)
      })

      // --------------------------------------------------------------------------

      socket.on('disconnect', () => {
         removeUser(socket.id, socket)
      })
   })
   return { io: socketIo, onlineFriends, getUser }
}
