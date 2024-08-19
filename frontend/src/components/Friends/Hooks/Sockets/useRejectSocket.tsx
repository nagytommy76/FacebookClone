import { useEffect, useContext } from 'react'
import { FriendContext } from '../../Context/FriendContext'
import { socket } from '@/src/utils/socketIo'
import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setHeadText, setMessage, setImageSrc, setIsInfoSnackOpen } from '@/reduxStore/slices/InfoSnack'
import type { IArgs } from './Types'

const useRejectSocket = () => {
   const dispatch = useAppDispatch()
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      friendReducer: { friendId },
      friendDispatch,
      setCardButtonType,
   } = useContext(FriendContext)

   useEffect(() => {
      const rejectFriend = (data: IArgs) => {
         if (friendId == data.friendId) {
            friendDispatch({ type: 'REMOVE_SINGLE_FRIEND', payload: userId as string })
            dispatch(setHeadText(data.friend.userName))
            dispatch(setMessage('Elutasította a barátfelkérésedet!'))
            dispatch(setImageSrc(data.friend.currentImage))
            dispatch(setIsInfoSnackOpen(true))
            setCardButtonType('makeFriend')
         }
      }

      socket.on('friend:rejectFriendResponse', rejectFriend)
      return () => {
         socket.off('friend:rejectFriendResponse', rejectFriend)
      }
   }, [dispatch, friendId, userId, friendDispatch, setCardButtonType])

   return null
}

export default useRejectSocket
