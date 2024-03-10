import type { ObjectId } from 'mongoose'

export type NotificationType = 'isComment' | 'isPostLike' | 'isCommentLike' | 'isFriend' | 'isFriendConfirm'

export interface INotifications<T = { postId: string | ObjectId; description: string }> {
   _id?: string
   notificationType: NotificationType
   isRead: boolean
   createdAt: Date
   data?: T
   userDetails: {
      userId: String | ObjectId
      firstName: string
      sureName: string
      profilePicture: string
   }
}
