import React from 'react'
import type { FriendButtonType } from '../Types'

import BaseButton from './Buttons/BaseButton'

const ButtonTypes: React.FC<{
   buttonType: FriendButtonType
   loading: boolean
   friendRequestMutate: () => void
}> = ({ buttonType, loading, friendRequestMutate }) => {
   switch (buttonType) {
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
               onClickEvent={() => {}}
               iconType='addIcon'
               color='warning'
            />
         )
      default:
         return <></>
   }
}

export default ButtonTypes
