import React from 'react'
import type { FriendButtonType } from '../Types'

import LoadingButton from '@mui/lab/LoadingButton'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

const ButtonTypes: React.FC<{
   buttonType: FriendButtonType
   loading: boolean
   friendRequestMutate: () => void
}> = ({ buttonType, loading, friendRequestMutate }) => {
   switch (buttonType) {
      case 'makeFriend':
         return (
            <LoadingButton
               onClick={friendRequestMutate}
               endIcon={<PersonAddAlt1Icon />}
               loading={loading}
               loadingPosition='end'
               variant='outlined'
               color='info'
               fullWidth
            >
               <span>Jelölés</span>
            </LoadingButton>
         )
      case 'withdrawRequest':
         return (
            <LoadingButton
               onClick={() => {}}
               endIcon={<PersonRemoveIcon />}
               loading={loading}
               loadingPosition='end'
               variant='outlined'
               color='error'
               fullWidth
            >
               <span>Jelölés visszavonása</span>
            </LoadingButton>
         )
      case 'isFriend':
         return (
            <LoadingButton
               onClick={() => {}}
               endIcon={<PersonRemoveIcon />}
               loading={loading}
               loadingPosition='end'
               variant='outlined'
               color='error'
               fullWidth
            >
               <span>Barát Törlése</span>
            </LoadingButton>
         )
      case 'confirmFriend':
         return (
            <LoadingButton
               onClick={() => {}}
               endIcon={<PersonAddAlt1Icon />}
               loading={loading}
               loadingPosition='end'
               variant='outlined'
               color='warning'
               fullWidth
            >
               <span>Visszaigazolás</span>
            </LoadingButton>
         )
      default:
         return <></>
   }
}

export default ButtonTypes
