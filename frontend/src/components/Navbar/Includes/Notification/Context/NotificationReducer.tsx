import { produce } from 'immer'
import type { NotificationType } from '../Types'

export type NotificationsAction =
   | 'SET_ALL_NOTIFICATIONS'
   | 'ADD_NOTIFICATION'
   | 'SET_ACTIVE'
   | 'UPDATE_ISREAD_BYID'

export interface INotificationsAction {
   type: NotificationsAction
   payload: any
}

export interface InitialNotificationState {
   notifications: NotificationType[] | null
   activeNotifications: number
}

export const initialNotificationsState: InitialNotificationState = {
   activeNotifications: 0,
   notifications: null,
}

export default function PostsReducer(
   state: InitialNotificationState,
   action: INotificationsAction
): InitialNotificationState {
   switch (action.type) {
      case 'SET_ALL_NOTIFICATIONS':
         const allNot = produce(state, (draft) => {
            draft.notifications = action.payload
         })
         return allNot
      case 'ADD_NOTIFICATION':
         const addedNot = produce(state, (draft) => {
            draft.notifications?.push(action.payload)
         })
         return addedNot
      case 'SET_ACTIVE':
         const active = produce(state, (draft) => {
            draft.activeNotifications = action.payload
         })
         return active
      case 'UPDATE_ISREAD_BYID':
         const notificationId = action.payload as string
         const updatedIsRead = produce(state, (draft) => {
            const updatedArray = draft.notifications?.map((notif) => {
               if (notif._id === notificationId) {
                  notif.isRead = true
               }
               return notif
            })
            if (updatedArray !== undefined) {
               draft.notifications = updatedArray
               draft.activeNotifications = draft.activeNotifications -= 1
            }
         })
         return updatedIsRead
      default:
         return state
   }
}
