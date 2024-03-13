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
            setNotificationContext(args, notificationsDispatch)
            notificationsDispatch({ type: 'SET_AUDIO_PLAY', payload: null })
         })
         socket.on('addComment', (args) => {
            setNotificationContext(args, notificationsDispatch)
            notificationsDispatch({ type: 'SET_AUDIO_PLAY', payload: null })
         })

         socket.on('makeFriendship', (args) => {
            setNotificationContext(args, notificationsDispatch)
            notificationsDispatch({ type: 'SET_AUDIO_PLAY', payload: null })
         })
         socket.on('confirmFriendship', (args) => {
            setNotificationContext(args, notificationsDispatch)
            notificationsDispatch({ type: 'SET_AUDIO_PLAY', payload: null })
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
