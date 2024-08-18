import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { socket } from '@/src/utils/socketIo'
import type { IFriends } from '../../Types'

interface IMakeFriendshipArgs {
   userFriends: {
      friends: IFriends[]
      _id: string
   }
}

const useFriendSocket = () => {
   const {
      friendReducer: { friendId },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)

   useEffect(() => {
      const setButtonType = (args: IMakeFriendshipArgs) => {
         if (friendId == args.userFriends._id) {
            friendDispatch({ type: 'SET_FRIENDS_ARRAY', payload: args.userFriends.friends })
            // Ezzel csatlakozok a friends szobába -> receiver
            socket.emit('friend:join_friend', { friendId: args.userFriends._id })
            setCardButtonType('confirmFriend')
         }
      }
      socket.on('makeFriendship', setButtonType)
      return () => {
         socket.off('makeFriendship', setButtonType)
      }
   }, [friendDispatch, setCardButtonType, friendId])

   return null
}

export default useFriendSocket
