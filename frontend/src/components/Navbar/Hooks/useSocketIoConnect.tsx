import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setOnlineStatus } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

const useSocketIoConnect = () => {
   const dispatch = useAppDispatch()
   const userId = useAppSelector((state) => state.auth.userId)
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      if (isLoggedIn) {
         socket.connect()
         socket.on('connect', () => {
            if (userId !== null || userId !== '') {
               socket.emit('newUser', userId)
            }
         })

         socket.on('online:friends', (args: { userId: string; socketId: string }) => {
            dispatch(setOnlineStatus({ friendId: args.userId, status: true }))
         })

         socket.on('offline:friends', (args: { userId: string }) => {
            dispatch(setOnlineStatus({ friendId: args.userId, status: false }))
         })
      }
      return () => {
         socket.on('disconnect', (reason, details) => {
            socket.emit('disconnect:user', userId)
         })
      }
   }, [userId, isLoggedIn, dispatch])

   useEffect(() => {
      if (messageLabels) {
         const labels = Object.keys(messageLabels)
         socket.emit('join_room', { chatRoomId: labels })
      }
   }, [messageLabels])

   return null
}

export default useSocketIoConnect
