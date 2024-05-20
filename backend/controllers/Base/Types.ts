import type { ObjectId } from 'mongoose'

export interface IReactionTypes {
   [index: string]: boolean
   isLike: boolean
   isLove: boolean
   isCare: boolean
   isHaha: boolean
   isWow: boolean
   isSad: boolean
   isAngry: boolean
}

export interface ILike {
   _id?: string | ObjectId
   userId: ObjectId
   reactionType: IReactionTypes
}

export type LikeTypes = 'isLike' | 'isLove' | 'isCare' | 'isHaha' | 'isWow' | 'isSad' | 'isAngry'
