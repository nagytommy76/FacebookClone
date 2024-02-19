import { IWorkPlaces } from '@/src/types/AuthTypes'
import { IProfilePicture } from '@/src/types/PostTypes'

export interface IFriends {
   userId: string
   isAccepted: boolean
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
}
