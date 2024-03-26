import type { NotificationType } from '@/src/components/Navbar/Includes/Notification/Types'
import type { IConnectedFriends, IFriends } from '../../Types'

export interface IMakeFriendshipArgs {
   notifications: NotificationType
   userFriends: IFriends[]
   foundFriendsModel: IConnectedFriends
}
