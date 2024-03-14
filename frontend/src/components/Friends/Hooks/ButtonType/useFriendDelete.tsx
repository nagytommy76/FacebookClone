import { SetStateAction, useCallback, useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IFriends } from '../../Types'

const SetCardType = (
   mySentFriendRequests: IFriends | undefined,
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void
) => {
   if (mySentFriendRequests) {
      if (mySentFriendRequests.isAccepted === true) {
         setCardButtonType('isFriend')
      }
   }
}

const useFriendDelete = (
   friendId: string,
   friends: IFriends[],
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const setCardTypeDeleteFriend = useCallback(
      (friends: IFriends[]) => {
         const mySentFriendRequests = friends.find((item) => item.receiverUserId === userId && !item.isSender)
         SetCardType(mySentFriendRequests, setCardButtonType)
         return mySentFriendRequests
      },
      [setCardButtonType, userId]
   )

   const setCardTypeDeleteFriendReceiver = useCallback(
      (friends: IFriends[]) => {
         const mySentFriendRequests = friends.find(
            (item) => item.receiverUserId === friendId && item.isReceiver
         )
         SetCardType(mySentFriendRequests, setCardButtonType)
         return mySentFriendRequests
      },
      [setCardButtonType, friendId]
   )

   const setCardTypeDeleteFriendSender = useCallback(
      (friends: IFriends[]) => {
         const mySentFriendRequests = friends.find((item) => item.senderUserId === friendId && item.isSender)
         SetCardType(mySentFriendRequests, setCardButtonType)
         return mySentFriendRequests
      },
      [setCardButtonType, friendId]
   )

   useEffect(() => {
      setCardTypeDeleteFriendReceiver(friends)
      setCardTypeDeleteFriendSender(friends)
   }, [setCardTypeDeleteFriendReceiver, setCardTypeDeleteFriendSender, friends])

   return { setCardTypeDeleteFriend, setCardTypeDeleteFriendReceiver }
}

export default useFriendDelete
