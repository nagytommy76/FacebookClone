import type { NotificationType } from '@/src/components/Navbar/Includes/Notification/Types'
import type { IFriends } from '../../Types'

export interface IMakeFriendshipArgs {
   notifications: NotificationType
   userFriends: IFriends
}
