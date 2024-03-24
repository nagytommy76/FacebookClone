import { useContext } from 'react'
import { FriendContext } from '../Context/FriendContext'
import BaseButton from './Buttons/BaseButton'

import useFriendRequest from '../Hooks/Requests/useFriendRequest'
import useFriendCornfirmRequest from '../Hooks/Requests/useFriendCornfirmRequest'
import useFriendDeleteRequest from '../Hooks/Requests/useFriendDeleteRequest'

const ButtonTypes = () => {
   const { cardButtonType, loading } = useContext(FriendContext)
   const { friendRequestMutate } = useFriendRequest()
   const { friendConfrimMutate } = useFriendCornfirmRequest()
   const { deleteFriendMutate } = useFriendDeleteRequest()

   switch (cardButtonType) {
      case 'makeFriend':
         return <BaseButton buttonText='Jelölés' isLoading={loading} onClickEvent={friendRequestMutate} />
      case 'withdrawRequest':
         return (
            <BaseButton
               buttonText='Jelölés visszavonása'
               isLoading={loading}
               onClickEvent={() => deleteFriendMutate(true)}
               iconType='removeIcon'
               color='error'
            />
         )
      case 'isFriend':
         return (
            <BaseButton
               buttonText='Barát Törlése'
               isLoading={loading}
               onClickEvent={() => deleteFriendMutate()}
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
