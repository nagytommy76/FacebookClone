import { useEffect } from 'react'
import { socket } from '@/src/utils/socketIo'
import type { IFriends } from '../../Types'
import type { IMakeFriendshipArgs } from './Types'

const useConfirmSocket = (
   friendId: string,
   setCardTypeDeleteFriendReceiver: (friends: IFriends[]) => IFriends | undefined
) => {
   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         setCardTypeDeleteFriendReceiver(args.userFriends)
      }
      socket.on('confirmFriendship', setButtonType)

      return () => {
         socket.off('confirmFriendship', setButtonType)
      }
   }, [setCardTypeDeleteFriendReceiver, friendId])

   return null
}

export default useConfirmSocket
