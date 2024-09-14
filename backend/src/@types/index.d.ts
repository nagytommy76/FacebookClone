import { Request } from 'express'
import type { IOnlineFriends, IOnlineFriendsRedis } from '../../config/socketIo'
import type { Server } from 'socket.io'
import type { RedisClientType } from 'redis'

declare global {
   namespace Express {
      interface Request {
         ioSocket: Server<any, any, any, any>
         onlineFriends: IOnlineFriends[]
         getUser: (userId: string) => IOnlineFriends | undefined
         getUserById: (userId: string) => Promise<IOnlineFriendsRedis>
         redisClient: any
         user: {
            userId: string
            email: string
            iat: number
            exp: number
         }
      }
   }
}

export {}
// https://innovatewebtech.blogspot.com/2024/06/enhancing-expressjs-requests-with.html
// https://blog.logrocket.com/extend-express-request-object-typescript/
// https://www.youtube.com/watch?v=W_tbNGERaKw&ab_channel=academeez
