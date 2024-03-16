import { SetStateAction, useCallback, useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IFriends } from '../../Types'

const SetCardType = (
   friends: IFriends[],
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void,
   findFucntion: (item: IFriends) => boolean | null
) => {
   const mySentFriendRequests = friends.find(findFucntion)
   if (mySentFriendRequests) {
      // if (mySentFriendRequests.isAccepted === true) {
      setCardButtonType('isFriend')
      // }
   }
   return mySentFriendRequests
}

const useFriendDelete = (
   friendId: string,
   friends: IFriends[],
   setCardButtonType: (value: SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const setCardTypeDeleteFriend = useCallback(
      (friends: IFriends[]) => {
         const findFunction = (item: IFriends) => item.receiverUserId === userId && !item.isSender
         return SetCardType(friends, setCardButtonType, findFunction)
      },
      [setCardButtonType, userId]
   )

   const setCardTypeDeleteFriendReceiver = useCallback(
      (friends: IFriends[]) => {
         const findFunction = (item: IFriends) => {
            if (/*item.senderUserId == userId ||*/ item.receiverUserId == userId) {
               return item.senderUserId === friendId && item.isSender
            }
            return null
         }
         return SetCardType(friends, setCardButtonType, findFunction)
      },
      [setCardButtonType, friendId, userId]
   )

   const setCardTypeDeleteFriendSender = useCallback(
      (friends: IFriends[]) => {
         const findFunction = (item: IFriends) => {
            if (item.senderUserId == userId /*|| item.receiverUserId == userId*/) {
               return item.receiverUserId === friendId && item.isReceiver
            }
            return null
         }
         return SetCardType(friends, setCardButtonType, findFunction)
      },
      [setCardButtonType, friendId, userId]
   )

   useEffect(() => {
      setCardTypeDeleteFriendReceiver(friends)
      setCardTypeDeleteFriendSender(friends)
   }, [setCardTypeDeleteFriendReceiver, setCardTypeDeleteFriendSender, friends])

   return { setCardTypeDeleteFriend, setCardTypeDeleteFriendReceiver }
}

export default useFriendDelete
