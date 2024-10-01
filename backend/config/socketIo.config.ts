import { Server, Socket } from 'socket.io'
import redisService from './redis.config'

import type { IMessage } from '../models/chat/Types'

interface SocketWithUserId extends Socket {
   userId?: string
}

export default class SocketService {
   public io: Server
   public onlineFriends: { userId: string; socketId: string }[] = []

   constructor(io: Server) {
      this.io = io
   }

   public initializeSocketHandlers() {
      this.io.listen(3001)
      this.io.on('connection', (socket: SocketWithUserId) => {
         socket.on('login', (userId: string) => {
            socket.userId = userId
         })
         socket.on('newUser', async (args: { userId: string; userName: string; profilePicture: string }) => {
            const { userId, userName } = args
            // The userId loses its value after the server is restarted (saved)... SOLUTION!!!
            socket.userId = userId
            await redisService.addOnlineFriend(userId, socket.id)
            if (userId) {
               const onlineUserData = await redisService.getUserById(userId)
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
            const allOnlineFriends = await redisService.getAllUsers(args.friendIds)
            socket.emit('friend:checkOnlineFriendsResponse', allOnlineFriends)
         })

         socket.on('disconnect', async () => {
            await redisService.setActiveUserById(socket.userId, socket.id, false)
            const userData = await redisService.getUserById(socket.userId)
            socket.broadcast.emit('offline:friend', { userData, userId: socket.userId })
         })
      })
   }
}
