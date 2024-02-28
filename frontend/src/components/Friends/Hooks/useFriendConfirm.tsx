import { useEffect, useCallback } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import type { FriendButtonType, IFriends } from '../Types'

const useFriendConfirm = (
   friends: IFriends[],
   setCardButtonType: (value: React.SetStateAction<FriendButtonType>) => void
) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const setButtonTypeToConfirmFriend = useCallback(
      (friends: IFriends[]) => {
         // Ebben az esetben megtaláltam a nekem ( belépett user ) küldött requesteket
         const myFriendRequest = friends.find((item) => item.userId === userId && item.isSender === true)
         if (myFriendRequest) {
            if (myFriendRequest.isSender) {
               setCardButtonType('confirmFriend')
            }
         }
      },
      [setCardButtonType, userId]
   )

   useEffect(() => {
      setButtonTypeToConfirmFriend(friends)
   }, [setButtonTypeToConfirmFriend, friends])

   return setButtonTypeToConfirmFriend
}

export default useFriendConfirm
