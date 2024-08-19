import type { NotificationType } from '@/src/components/Navbar/Includes/Notification/Types'
import type { IFriends } from '../../Types'

export interface IMakeFriendshipArgs {
   notifications: NotificationType
   userFriends: IFriends
}

export interface IArgs {
   friendId: string
   roomId: string
   friend: {
      currentImage: string
      userName: string
   }
}
