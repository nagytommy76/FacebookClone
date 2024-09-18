import { createClient } from 'redis'
import { REDIS_PASSWORD } from './endpoints.config'

// const REDIS_PASSWORD = process.env.REDIS_PASSWORD
// export async function initRedisCahce() {
//    const pubClient = createClient({
//       password: REDIS_PASSWORD,
//       socket: {
//          host: 'redis-13848.c250.eu-central-1-1.ec2.redns.redis-cloud.com',
//          port: 13848,
//       },
//    }).on('error', (err) => console.log('Redis Client Error', err))

//    const subClient = pubClient.duplicate()

//    if (!pubClient.isOpen) {
//       await pubClient.connect()
//    }
//    if (!subClient.isOpen) {
//       await subClient.connect()
//    }

//    return { pubClient, subClient }
// }

class RedisService {
   public client
   public subClient
   constructor() {
      this.client = createClient({
         password: REDIS_PASSWORD,
         socket: {
            host: 'redis-13848.c250.eu-central-1-1.ec2.redns.redis-cloud.com',
            port: 13848,
         },
      }).on('error', (err) => console.log('Redis Client Error', err))
      this.subClient = this.client.duplicate()
   }

   public async connect() {
      await this.client.connect()
      await this.subClient.connect()
   }
}

export default new RedisService()
