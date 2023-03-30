import { Model, ObjectId } from 'mongoose'
// import { Request } from 'express'

export interface IPostLike {
   userId: ObjectId
   reactionType: {
      isLike: boolean
      isLove: boolean
      isHaha: boolean
      isWow: boolean
      isSad: boolean
      isAngry: boolean
   }
}

export interface IPostComment {
   userId: ObjectId
   answer: string
   answeredAt: Date
   parentCommentId: string
   commentDepth: number
   likes: IPostLike
}

export interface IPostTypes {
   _id: ObjectId
   userId: ObjectId
   description: string
   postedPicturesPath: string[]
   postedAt: Date
   likes: IPostLike
   comments: IPostComment
}
