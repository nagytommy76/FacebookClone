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

   io.on('connection', (socket) => {
      // console.log(socket.connected)
      // Ezzel küldök minden client felé egy üzenetet
      // io.emit('notifications', [
      //    { name: 'liked', who: 'Pista' },
      //    { name: 'liked', who: 'Béla' },
      //    { name: 'liked', who: 'Alma' },
      //    { name: 'liked', who: 'Tomi' },
      // ])
      // Ezzel pedig fogadom az üzit frontendről
      // io.on('add-message', (args) => {
      //    console.log(args)
      // })
      // io.on('disconnect', () => console.log('DISCONNECT'))
   })
   return io
}
