export type NotificationType = {
   notificationType: 'isComment' | 'isPostLike' | 'isCommentLike'
   isRead: boolean
   createdAt: Date
   postData: {
      postId: string
      description: string
   }
   userDetails: {
      userId: String
      firstName: string
      sureName: string
      profilePicture: string
   }
}
