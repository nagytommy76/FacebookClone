import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { socket } from '@/src/utils/socketIo'
import { useAppDispatch } from '@/reduxStore/store'
import { setHeadText, setMessage, setImageSrc, setIsInfoSnackOpen } from '@/reduxStore/slices/InfoSnack'

interface IArgs {
   friendId: string
   friend: {
      currentImage: string
      userName: string
   }
}

const useWithdrawSocket = () => {
   const dispatch = useAppDispatch()
   const {
      friendReducer: { friendId },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)

   useEffect(() => {
      const withdrawFriend = (data: IArgs) => {
         if (friendId == data.friendId) {
            friendDispatch({ type: 'REMOVE_SINGLE_FRIEND', payload: data.friendId })
            dispatch(setHeadText(data.friend.userName))
            dispatch(setMessage('Visszavonta a barátfelkérését!'))
            dispatch(setImageSrc(data.friend.currentImage))
            dispatch(setIsInfoSnackOpen(true))
            setCardButtonType('makeFriend')
         }
      }

      socket.on('friend:withdrawFriendResponse', withdrawFriend)

      return () => {
         socket.off('friend:withdrawFriendResponse', withdrawFriend)
      }
   }, [friendId, friendDispatch, dispatch, setCardButtonType])
   return null
}

export default useWithdrawSocket
