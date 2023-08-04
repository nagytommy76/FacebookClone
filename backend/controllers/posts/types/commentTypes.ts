import { ObjectId } from 'mongoose'
import type { IPostLike } from './PostTypes'

export interface ICommentAnswer {
   _id?: string | ObjectId
   userId: string
   comment: string
   parentCommentId: string
   commentDepth: number
   answeredAt: string
   commentImage: string
   likes?: IPostLike[]
}

export interface IPostComment {
   _id?: string | ObjectId
   userId:
      | ObjectId
      | string
      | {
           firstName: string
           sureName: string
           userDetails: { profilePicturePath: { _id: string; path: string; isSelected: boolean }[] }
        }
   comment: string
   answeredAt?: Date | string
   commentImage?: string
   parentCommentId: string | null
   commentDepth: number
   commentAnswers?: ICommentAnswer[]
   likes: IPostLike[]
}
