import { createClient } from 'redis'
import { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } from './endpoints.config'

interface IOnlineFriendsRedis {
   userId: string
   socketId: string
   isActive: number
   lastSeen: number
}
class RedisService {
   public client
   public subClient
   constructor() {
      this.client = createClient({
         username: 'default',
         password: REDIS_PASSWORD,
         socket: {
            host: REDIS_HOST,
            port: Number(REDIS_PORT),
         },
      }).on('error', (err) => console.log('Redis Client Error', err))
      this.subClient = this.client.duplicate()
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
      return await this.client.hSet(`activeUsers:${userId}`, {
         isActive: isActive ? 1 : 0,
         socketId: newSocketId,
         lastSeen: Date.now(),
      })
   }

   public async getUserById(userId: string = '') {
      return (await this.client.hGetAll(`activeUsers:${userId}`)) as unknown as Promise<IOnlineFriendsRedis>
   }

   public async addOnlineFriend(userId: string, socketId: string) {
      // Check to see user is already in redis
      const userIsInRedis = await this.client.hExists(`activeUsers:${userId}`, 'userId')
      // if true we don't need to add them again
      if (userIsInRedis) {
         return await this.setActiveUserById(userId, socketId, true)
      } else {
         if (!userId) return
         return await this.client.hSet(`activeUsers:${userId}`, {
            userId: userId,
            socketId: socketId,
            isActive: 1,
            lastSeen: Date.now(),
         })
      }
   }

   public async connect() {
      await this.client.connect()
      await this.subClient.connect()
   }
}

export default new RedisService()
