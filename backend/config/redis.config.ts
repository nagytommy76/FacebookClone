import { createClient } from 'redis'

export async function initRedisCahce() {
   const REDIS_PASSWORD = process.env.REDIS_PASSWORD
   const pubClient = createClient({
      password: REDIS_PASSWORD,
      socket: {
         host: 'redis-13848.c250.eu-central-1-1.ec2.redns.redis-cloud.com',
         port: 13848,
      },
   }).on('error', (err) => console.log('Redis Client Error', err))

   const subClient = pubClient.duplicate()

   await Promise.all([pubClient.connect(), subClient.connect()])
   return { pubClient, subClient }
}
