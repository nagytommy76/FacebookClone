import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'
import type { IFriends } from '../../Types'
import type { NotificationType } from '../../../Navbar/Includes/Notification/Types'

interface IMakeFriendshipArgs {
   notifications: NotificationType
   userFriends: IFriends[]
}

const useFriendSocket = (
   friendId: string,
   setButtonTypeToConfirmFriend: (friends: IFriends[], friendId: string) => void
) => {
   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         setButtonTypeToConfirmFriend(args.userFriends, friendId)
      }

      socket.on('makeFriendship', setButtonType)
      return () => {
         socket.off('makeFriendship', setButtonType)
      }
   }, [setButtonTypeToConfirmFriend, friendId])

   return null
}

export default useFriendSocket
