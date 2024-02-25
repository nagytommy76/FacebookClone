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

export interface IFriendsResponse {
   firstName: string
   sureName: string
   _id: string
   email: string
   createdAt: string
   dateOfBirth: string
   friends: IFriends[]
   selectedProfilePicture: IProfilePicture[]
   lastWorkPlace: IWorkPlaces[]
   notification: NotificationType[]
}
