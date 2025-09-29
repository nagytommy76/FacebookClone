import React, { createContext, useReducer, useEffect } from 'react'
import NotificationsReducer, {
   InitialNotificationState,
   INotificationsAction,
   initialNotificationsState,
} from './NotificationReducer'
import useGetNotifications from '../Hooks/useGetNotifications'

import Notification from '../Notification'

interface INotificationsContext {
   notificationsDispatch: React.Dispatch<INotificationsAction>
   notificationsReducer: InitialNotificationState
}

export const NotificationsContext = createContext<INotificationsContext>({
   notificationsDispatch: () => {},
   notificationsReducer: initialNotificationsState,
})

const NotificationContextProvider = () => {
   const [notificationsReducer, notificationsDispatch] = useReducer(
      NotificationsReducer,
      initialNotificationsState
   )
   useGetNotifications(notificationsDispatch)

   useEffect(() => {
      const audio = new Audio('/sounds/windows_xp_shutdown.mp3')
      notificationsDispatch({ type: 'SET_AUDIO', payload: audio })
   }, [])

   return (
      <NotificationsContext.Provider value={{ notificationsDispatch, notificationsReducer }}>
         <Notification />
      </NotificationsContext.Provider>
   )
}

export default NotificationContextProvider
