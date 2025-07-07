import type { IPostComment, ILike } from './LikeTypes'
import { IUserDetails } from './AuthTypes'

export interface IPopulatedUserId<T = IUserDetails> {
   _id: string
   email: string
   firstName: string
   sureName: string
   userDetails: T
}

export interface IPost {
   _id: string
   userId: IPopulatedUserId
   comments: IPostComment[]
   description: string
   likes: ILike[]
   postedPicturesPath: string[] | null
   createdAt: string
   updatedAt: string
}

export interface IProfilePicture {
   _id: string
   path: string
   isSelected: boolean
}
