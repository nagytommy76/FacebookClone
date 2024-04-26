import { useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import { socket } from '@/src/utils/socketIo'

const useSocketIoConnect = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      socket.connect()
      socket.on('connect', () => {
         socket.emit('newUser', userId)

         if (messageLabels) {
            const labels = Object.keys(messageLabels)
            socket.emit('join_room', { chatRoomId: labels })
         }
      })
      return () => {
         socket.disconnect()
      }
   }, [userId, messageLabels])

   return null
}

export default useSocketIoConnect
