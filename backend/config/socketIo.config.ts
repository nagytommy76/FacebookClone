import { Server, Socket } from 'socket.io'
import redisService from './redis.config'

import type { IMessage } from '../models/chat/Types'

interface SocketWithUserId extends Socket {
   userId?: string
}

interface IOnlineFriendsRedis {
   [x: string]: {
      userId: string
      socketId: string
      isActive: number
      lastSeen: number
   }
}

export default class SocketService {
   public io: Server
   public onlineFriends: { userId: string; socketId: string }[] = []

   constructor(io: Server) {
      this.io = io
   }

   public async getAllUsers(friendIds: string[]) {
      const allOnlineFriends: {
         [key: string]: IOnlineFriendsRedis
      } = {}
      for (let index = 0; index < friendIds.length; index++) {
         const friend = await this.getUserById(friendIds[index])
         if (Object.keys(friend).length !== 0) {
            allOnlineFriends[friendIds[index]] = friend
         }
      }
      return allOnlineFriends
   }

   public async setActiveUserById(
      userId: string | undefined,
      newSocketId: string,
      isActive: boolean = false
   ) {
      if (!userId) return
      return await redisService.client.hSet(`activeUsers:${userId}`, {
         isActive: isActive ? 1 : 0,
         socketId: newSocketId,
      })
   }

   public async getUserById(userId: string = '') {
      return (await redisService.client.hGetAll(
         `activeUsers:${userId}`
      )) as unknown as Promise<IOnlineFriendsRedis>
   }

   public async addOnlineFriend(userId: string, socketId: string) {
      // Check to see user is already in redis
      const userIsInRedis = await redisService.client.hExists(`activeUsers:${userId}`, 'userId')
      // if true we don't need to add them again
      if (userIsInRedis) {
         return await this.setActiveUserById(userId, socketId, true)
      } else {
         return await redisService.client.hSet(`activeUsers:${userId}`, {
            userId: userId,
            socketId: socketId,
            isActive: 1,
            lastSeen: Date.now(),
         })
      }
   }

   public initializeSocketHandlers() {
      this.io.listen(3001)
      this.io.on('connection', (socket: SocketWithUserId) => {
         socket.on('newUser', async (args: { userId: string; userName: string; profilePicture: string }) => {
            const { userId, userName } = args
            // The userId loses its value after the server is restarted (saved)... SOLUTION!!!
            socket.userId = userId
            await this.addOnlineFriend(userId, socket.id)
            if (userId) {
               const onlineUserData = await this.getUserById(userId)
               socket.broadcast.emit('online:friend', {
                  onlineUserData,
                  userName,
                  profilePicture: args.profilePicture,
               })
            }
         })

         socket.on('join_room', (args: { chatRoomId: string[] }) => {
            socket.join(args.chatRoomId)
         })

         // CHAT ---------------------------------------------------------------------

         socket.on('chat:createChat', (args) => {
            let foundUserSocketId = this.onlineFriends.find((user) => user.userId === args.toUserId)?.socketId
            // socket.broadcast.to(args.createdChatId).emit('chat:createChatResponse', args)
            if (foundUserSocketId)
               socket.broadcast.to(foundUserSocketId).emit('chat:createChatResponse', args)
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

         socket.on('friend:checkOnlineFriends', async (args: { friendIds: string[] }) => {
            const allOnlineFriends = await this.getAllUsers(args.friendIds)
            socket.emit('friend:checkOnlineFriendsResponse', allOnlineFriends)
         })

         socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id)
         })
      })
   }

   public async publishToRedis(channel: string, message: string) {
      await redisService.client.publish(channel, message)
   }
}
