import type { Application } from 'express'
import { createServer } from 'https'
import { Server, Socket } from 'socket.io'
import { initRedisCahce } from './redis.config'
import { createAdapter } from '@socket.io/redis-adapter'

import type { IMessage } from '../models/chat/Types'

export interface IOnlineFriends {
   userId: string
   socketId: string
}

export interface IOnlineFriendsRedis {
   [x: string]: {
      userId: string
      socketId: string
      isActive: number
      lastSeen: number
   }
}

interface SocketWithUserId extends Socket {
   userId?: string
}

// Ezzel megvannak az online userek -> tudok válogatni köztük ki kapjon üzit (AKIT ÉRINT -> POST LIKE)
let onlineFriends: IOnlineFriends[] = []

export const initSocketIO = async (app: Application) => {
   const { pubClient, subClient } = await initRedisCahce()
   const httpsServer = createServer(app)
   const socketIo = new Server(httpsServer, {
      adapter: createAdapter(pubClient, subClient),
      cors: {
         origin: ['http://localhost:3000'],
         methods: ['GET', 'POST'],
         credentials: true,
      },
   })

   socketIo.listen(3001)

   async function setActiveUserById(userId: string = '', newSocketId: string, isActive: boolean = false) {
      // console.log('SET ACTIVE', userId)
      return await pubClient.hSet(`activeUsers:${userId}`, {
         isActive: isActive ? 1 : 0,
         socketId: newSocketId,
      })
   }

   const addOnlineFriend = async (userId: string, socketId: string) => {
      // Check to see user is already in redis
      const userIsInRedis = await pubClient.hExists(`activeUsers:${userId}`, 'userId')
      // if true we don't need to add them again
      if (userIsInRedis) {
         return await setActiveUserById(userId, socketId, true)
      } else {
         return await pubClient.hSet(`activeUsers:${userId}`, {
            userId: userId,
            socketId: socketId,
            isActive: 1,
            lastSeen: Date.now(),
         })
      }
   }

   async function getUserById(userId: string = '') {
      return (await pubClient.hGetAll(`activeUsers:${userId}`)) as unknown as Promise<IOnlineFriendsRedis>
   }

   const getUser = (userId: string) => {
      return onlineFriends.find((user) => user.userId === userId)
   }

   // https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-rooms-work-in-socket-io
   socketIo.on('connection', (socket: SocketWithUserId) => {
      socket.on('newUser', async (userId: string) => {
         socket.userId = userId
         await addOnlineFriend(userId, socket.id)
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

      socket.on('chat:deleteChat', (args) => {
         socket.broadcast.to(args.chatId).emit('chat:deleteChatResponse', args)
      })

      // --------------------------------------------------------------------------
      // FRIENDS -------------------------------------------------------------------

      socket.on('friend:join_friend', (args: { friendId: string }) => {
         socket.join(args.friendId)
      })

      socket.on('friend:withdrawFriend', (args: { friendId: string }) => {
         socket.broadcast.to(args.friendId).emit('friend:withdrawFriendResponse', args)
      })
      socket.on('friend:rejectFriend', (args: { friendId: string; roomId: string }) => {
         socket.broadcast.to(args.roomId).emit('friend:rejectFriendResponse', args)
      })

      socket.on('disconnect', async () => {
         await setActiveUserById(socket.userId, socket.id)
      })
   })
   return { io: socketIo, onlineFriends, getUserById, getUser }
}
