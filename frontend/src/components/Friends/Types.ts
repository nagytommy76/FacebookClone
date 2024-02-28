import { IProfilePicture } from '@/src/types/PostTypes'
import type { IWorkPlaces } from '@/src/types/AuthTypes'
import type { NotificationType } from '../Navbar/Includes/Notification/Types'

export type FriendButtonType = 'isFriend' | 'withdrawRequest' | 'makeFriend' | 'confirmFriend'

export interface IFriends {
   userId: string
   isAccepted: boolean
   isReceiver: boolean
   isSender: boolean
   createdAt: string
}

export interface IFriendResponse {
   _id: string
   firstName: string
   sureName: string
   friends: IFriends[]
   notification: NotificationType[]
}

export interface IFriendsResponse extends IFriendResponse {
   email: string
   createdAt: string
   dateOfBirth: string
   selectedProfilePicture: IProfilePicture[]
   lastWorkPlace: IWorkPlaces[]
}
