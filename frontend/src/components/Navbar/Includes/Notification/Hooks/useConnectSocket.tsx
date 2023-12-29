import { useEffect, useState, useContext } from 'react'
import { NotificationsContext } from '../Context/NotificationContextProvider'
import { socket } from '@/src/utils/socketIo'

import { useAppSelector } from '@/src/utils/redux/store'

const useConnectSocket = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      notificationsDispatch,
      notificationsReducer: { notifications, activeNotifications },
   } = useContext(NotificationsContext)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      socket.connect()
      socket.on('connect', () => {
         socket.emit('newUser', userId)

         socket.on('likedPost', (args) => {
            console.log(args)
            notificationsDispatch({ type: 'ADD_NOTIFICATION', payload: args[0] })
            // setNotifications(args)
         })
         socket.on('addComment', (args) => {
            console.log(args)
            // setNotifications(args)
            // notificationsDispatch({ type: 'SET_ALL_NOTIFICATIONS', payload: args })
         })
      })
      //   console.log(notifications)
      return () => {
         socket.off('likedPost')
         socket.off('addComment')
         socket.disconnect()
      }
   }, [userId, notificationsDispatch])

   return null
}

export default useConnectSocket
