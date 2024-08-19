import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { socket } from '@/src/utils/socketIo'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setHeadText, setMessage, setImageSrc, setIsInfoSnackOpen } from '@/reduxStore/slices/InfoSnack'
import type { IArgs } from './Types'

const useWithdrawSocket = () => {
   const dispatch = useAppDispatch()
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: { friendId },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)

   useEffect(() => {
      const withdrawFriend = (data: IArgs) => {
         if (friendId == data.friendId) {
            friendDispatch({ type: 'REMOVE_SINGLE_FRIEND', payload: userId as string })
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
   }, [friendId, userId, friendDispatch, dispatch, setCardButtonType])
   return null
}

export default useWithdrawSocket
