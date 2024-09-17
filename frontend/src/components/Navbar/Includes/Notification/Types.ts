export type NotificationTypes = 'isComment' | 'isPostLike' | 'isCommentLike' | 'isFriend' | 'isFriendConfirm'

export type NotificationType<T = { id: string | null; description: string; urlEndpoint?: string }> = {
   _id: string
   notificationType: NotificationTypes
   isRead: boolean
   createdAt: string
   data?: T
   userDetails: {
      userId: String
      firstName: string
      sureName: string
      profilePicture: string
   }
}
