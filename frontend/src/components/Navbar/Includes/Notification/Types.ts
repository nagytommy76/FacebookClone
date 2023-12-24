import type { IProfilePicture } from '@/src/types/PostTypes'

export type NotificationType = {
   notificationType: 'isLike' | 'isComment'
   postData: { description: string; _id: string }
   userId: {
      email: string
      firstName: string
      sureName: string
      userDetails: { profilePicturePath: IProfilePicture[] }
   }
}
