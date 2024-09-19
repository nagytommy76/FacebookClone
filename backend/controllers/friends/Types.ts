import { Request } from 'express'

export interface IMakeFriends extends Request {
   body: {
      friendId: string
      connectedFriendId: string
   }
}
export interface IRemoveFriend extends Request {
   body: {
      friendId: string
   }
}
