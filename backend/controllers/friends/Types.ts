import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export interface IMakeFriends extends IJWTUserType {
   body: {
      friendId: string
   }
}
