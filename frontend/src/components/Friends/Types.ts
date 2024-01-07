import { IProfilePicture } from '@/src/types/PostTypes'

export interface IFriends {
   firstName: string
   sureName: string
   _id: string
   email: string
   createdAt: string
   friends: string[]
   userDetails: { profilePicturePath: IProfilePicture[] }
}
