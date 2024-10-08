import { ILike } from '@/src/types/LikeTypes'
import { IProfilePicture } from '@/src/types/PostTypes'

export interface IParticipants {
   participant: string
   _id: string
}

export interface IPopulatedUserData {
   _id: string
   firstName: string
   sureName: string
   selectedProfilePicture: IProfilePicture[]
}

export interface IChat<MessageType = IMessages[]> {
   _id: string
   participants: IParticipants[]
   chatWithParticipant: IPopulatedUserData
   populatedParticipants: IPopulatedUserData[]
   createdAt: string
   updatedAt: string
   messages: MessageType
   totalUnreadMsgCount: number
}

export interface IMessages {
   _id: string
   createdAt?: string
   updatedAt?: string
   receiverUserId: string
   isRead?: boolean
   message: string
   image: string
   reaction: ILike[]
}
