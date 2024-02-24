import type { ObjectId } from 'mongoose'

export type NotificationType = 'isComment' | 'isPostLike' | 'isCommentLike' | 'isFriend'

export interface INotifications<T = { postId: string | ObjectId; description: string }> {
   _id?: string
   notificationType: NotificationType
   isRead: boolean
   createdAt: Date
   postData?: T
   userDetails: {
      userId: String | ObjectId
      firstName: string
      sureName: string
      profilePicture: string
   }
}
