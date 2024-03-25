import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export interface IMakeFriends extends IJWTUserType {
   body: {
      friendId: string
      connectedFriendId: string
   }
}
export interface IRemoveFriend extends IJWTUserType {
   body: {
      friendId: string
      connectedFriendId: string
   }
}
