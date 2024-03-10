import { useEffect, useContext, Dispatch } from 'react'
import { NotificationsContext } from '../Context/NotificationContextProvider'
import { socket } from '@/src/utils/socketIo'
import type { NotificationType } from '../Types'
import type { INotificationsAction } from '../Context/NotificationReducer'

import { useAppSelector } from '@/src/utils/redux/store'

interface INotificationArguments {
   notifications: NotificationType
}

const setNotificationContext = (
   args: INotificationArguments,
   notificationsDispatch: Dispatch<INotificationsAction>
) => {
   notificationsDispatch({ type: 'SET_ALL_NOTIFICATIONS', payload: args.notifications })
   notificationsDispatch({ type: 'SET_ACTIVE_NOTIFICATIONS_COUNT', payload: args.notifications })
}

const useConnectSocket = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const { notificationsDispatch } = useContext(NotificationsContext)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      socket.connect()
      socket.on('connect', () => {
         socket.emit('newUser', userId)

         socket.on('likedPost', (args) => {
            console.log(args)
            setNotificationContext(args, notificationsDispatch)
         })
         socket.on('addComment', (args) => {
            console.log(args)
            setNotificationContext(args, notificationsDispatch)
         })

         socket.on('makeFriendship', (args) => {
            console.log(args)
            setNotificationContext(args, notificationsDispatch)
         })
         socket.on('confirmFriendship', (args) => {
            console.log(args)
            setNotificationContext(args, notificationsDispatch)
         })
      })
      return () => {
         socket.off('likedPost')
         socket.off('addComment')
         socket.off('makeFriendship')
         socket.off('confirmFriendship')
         socket.disconnect()
      }
   }, [userId, notificationsDispatch])

   return null
}

export default useConnectSocket
