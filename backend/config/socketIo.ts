import { Application } from 'express'
import { createServer } from 'https'
import { Server } from 'socket.io'

export const initSocketIO = (app: Application) => {
   const httpsServer = createServer(app)
   const io = new Server(httpsServer, {
      cors: {
         origin: ['http://localhost:3000'],
         methods: ['GET', 'POST'],
         credentials: true,
      },
      /* options */
   })
   io.listen(3001)

   io.on('connect', (socket) => {
      // console.log(socket.connected)
      //   console.log('Helló SOCKET.IO')
      io.on('get-message', (params) => {
         console.log(params)
      })
      io.emit('test', { test: { name: 'semmi', age: 567, isMale: false } })
   })
   return io
}
