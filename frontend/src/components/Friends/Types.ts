import { IProfilePicture } from '@/src/types/PostTypes'
import type { IWorkPlaces } from '@/src/types/AuthTypes'
import type { NotificationType } from '../Navbar/Includes/Notification/Types'

export type FriendButtonType = 'isFriend' | 'withdrawRequest' | 'makeFriend' | 'confirmFriend'
export type StatusTypes = 'pending' | 'friends' | 'rejected'

export interface IFriends {
   _id: string
   friend: string
   isSender: boolean
   friendSince?: Date | string
   status?: 'pending' | 'friends' | 'rejected'
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
