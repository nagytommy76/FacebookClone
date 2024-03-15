import React from 'react'
import type { IFriends } from '../Types'

import BaseButton from './Buttons/BaseButton'

import useStates from '../Hooks/useStates'
import useFriendRequest from '../Hooks/Requests/useFriendRequest'
import useFriendCornfirmRequest from '../Hooks/Requests/useFriendCornfirmRequest'

const ButtonTypes: React.FC<{
   friendId: string
   friendFriends: IFriends[]
}> = ({ friendFriends, friendId }) => {
   const { cardButtonType, loading, setCardButtonType, setLoading } = useStates()
   const { friendRequestMutate } = useFriendRequest(friendId, friendFriends, setCardButtonType, setLoading)
   const { friendConfrimMutate } = useFriendCornfirmRequest(
      friendId,
      friendFriends,
      setLoading,
      setCardButtonType
   )

   switch (cardButtonType) {
      case 'makeFriend':
         return <BaseButton buttonText='Jelölés' isLoading={loading} onClickEvent={friendRequestMutate} />
      case 'withdrawRequest':
         return (
            <BaseButton
               buttonText='Jelölés visszavonása'
               isLoading={loading}
               onClickEvent={() => {}}
               iconType='removeIcon'
               color='error'
            />
         )
      case 'isFriend':
         return (
            <BaseButton
               buttonText='Barát Törlése'
               isLoading={loading}
               onClickEvent={() => {}}
               iconType='removeIcon'
               color='error'
            />
         )
      case 'confirmFriend':
         return (
            <BaseButton
               buttonText='Visszaigazolás'
               isLoading={loading}
               onClickEvent={friendConfrimMutate}
               iconType='addIcon'
               color='warning'
            />
         )
      default:
         return <></>
   }
}

export default ButtonTypes
