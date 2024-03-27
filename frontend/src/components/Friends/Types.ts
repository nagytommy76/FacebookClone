import { IProfilePicture } from '@/src/types/PostTypes'
import type { IWorkPlaces } from '@/src/types/AuthTypes'
import type { NotificationType } from '../Navbar/Includes/Notification/Types'

export type FriendButtonType = 'isFriend' | 'withdrawRequest' | 'makeFriend' | 'confirmFriend'
export type StatusTypes = 'pending' | 'friends'

export interface IConnectedFriends {
   _id: string
   senderUser: string
   receiverUser: string
   status: StatusTypes
   createdAt: string
   updatedAt: string
}

export interface IFriendResponse {
   _id: string
   firstName: string
   sureName: string
   friends: string[]
   notification: NotificationType[]
}

export interface IFriendsResponse extends IFriendResponse {
   email: string
   createdAt: string
   dateOfBirth: string
   selectedProfilePicture: IProfilePicture[]
   lastWorkPlace: IWorkPlaces[]
   connectedFriends: IConnectedFriends[]
}
