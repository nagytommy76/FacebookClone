import { useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import { socket } from '@/src/utils/socketIo'

const useSocketIoConnect = () => {
   const { userId, userName, currentImage } = useAppSelector((state) => state.auth)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   useEffect(() => {
      if (userId !== null || userId !== '') {
         socket.emit('newUser', { userName, userId, profilePicture: currentImage.path })
      }
   }, [userId, userName, currentImage.path])

   useEffect(() => {
      if (messageLabels) {
         const labels = Object.keys(messageLabels)
         socket.emit('join_room', { chatRoomId: labels })
      }
   }, [messageLabels])

   return null
}

export default useSocketIoConnect
