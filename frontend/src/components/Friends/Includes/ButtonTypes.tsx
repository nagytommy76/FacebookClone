import { useContext } from 'react'
import { FriendContext } from '../Context/FriendContext'
import BaseButton from './Buttons/BaseButton'

import useFriendRequest from '../Hooks/Requests/useFriendRequest'
import useFriendCornfirmRequest from '../Hooks/Requests/useFriendCornfirmRequest'
import useFriendDeleteRequest from '../Hooks/Requests/Delete/useFriendDeleteRequest'
import useWithdrawFriend from '../Hooks/Requests/Delete/useWithdrawFriend'

const ButtonTypes = () => {
   const {
      cardButtonType,
      loading,
      friendReducer: { friendId },
   } = useContext(FriendContext)
   const { friendRequestMutate } = useFriendRequest()
   const { friendConfrimMutate } = useFriendCornfirmRequest()

   const { deleteFriendMutate } = useFriendDeleteRequest()
   const { withdrawFriend } = useWithdrawFriend()

   switch (cardButtonType) {
      case 'makeFriend':
         return (
            <BaseButton
               friendId={friendId}
               buttonText='Jelölés'
               isLoading={loading}
               onClickEvent={friendRequestMutate}
            />
         )
      case 'withdrawRequest':
         return (
            <BaseButton
               friendId={friendId}
               buttonText='Jelölés visszavonása'
               isLoading={loading}
               onClickEvent={withdrawFriend}
               iconType='removeIcon'
               color='error'
            />
         )
      case 'isFriend':
         return (
            <BaseButton
               friendId={friendId}
               buttonText='Barát Törlése'
               isLoading={loading}
               onClickEvent={deleteFriendMutate}
               iconType='removeIcon'
               color='error'
            />
         )
      case 'confirmFriend':
         return (
            <div
               style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
               }}
            >
               <BaseButton
                  withChatButton={false}
                  buttonText='Visszaigazolás'
                  isLoading={loading}
                  onClickEvent={friendConfrimMutate}
                  iconType='addIcon'
                  color='warning'
               />
               <BaseButton
                  withChatButton={false}
                  buttonText='Elutasítás'
                  isLoading={loading}
                  onClickEvent={deleteFriendMutate}
                  iconType='removeIcon'
                  color='error'
               />
            </div>
         )
      default:
         return <></>
   }
}

export default ButtonTypes
