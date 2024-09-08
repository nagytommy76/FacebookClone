import { useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import { socket } from '@/src/utils/socketIo'

const useSocketIoConnect = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   useEffect(() => {
      if (userId !== null || userId !== '') {
         socket.emit('newUser', userId)
      }
   }, [userId])

   useEffect(() => {
      if (messageLabels) {
         const labels = Object.keys(messageLabels)
         socket.emit('join_room', { chatRoomId: labels })
      }
   }, [messageLabels])

   return null
}

export default useSocketIoConnect
