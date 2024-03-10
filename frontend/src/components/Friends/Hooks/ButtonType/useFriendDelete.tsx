import { SetStateAction, useCallback } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IFriends } from '../../Types'

const useFriendDelete = (
   friendId: string,
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const setCardTypeDeleteFriend = useCallback(
      (friends: IFriends[]) => {
         const mySentFriendRequests = friends.find((item) => item.receiverUserId === userId && !item.isSender)
         if (mySentFriendRequests) {
            if (mySentFriendRequests.isAccepted === true) {
               setCardButtonType('isFriend')
            }
         }
         return mySentFriendRequests
      },
      [setCardButtonType, userId]
   )
   const setCardTypeDeleteFriendReceiver = useCallback(
      (friends: IFriends[]) => {
         const mySentFriendRequests = friends.find(
            (item) => item.receiverUserId === friendId && item.isReceiver
         )
         if (mySentFriendRequests) {
            if (mySentFriendRequests.isAccepted === true) {
               setCardButtonType('isFriend')
            }
         }
         return mySentFriendRequests
      },
      [setCardButtonType, friendId]
   )

   return { setCardTypeDeleteFriend, setCardTypeDeleteFriendReceiver }
}

export default useFriendDelete
