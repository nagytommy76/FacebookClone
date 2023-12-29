import React, { createContext, useReducer } from 'react'
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
   notificationsReducer: { activeNotifications: 0, notifications: null },
})

const NotificationContextProvider = () => {
   const [notificationsReducer, notificationsDispatch] = useReducer(
      NotificationsReducer,
      initialNotificationsState
   )
   useGetNotifications(notificationsDispatch)
   return (
      <NotificationsContext.Provider value={{ notificationsDispatch, notificationsReducer }}>
         <Notification />
      </NotificationsContext.Provider>
   )
}

export default NotificationContextProvider
