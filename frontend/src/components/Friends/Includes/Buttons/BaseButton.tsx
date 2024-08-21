import Image from 'next/image'
import React from 'react'

import useChatModal from '@/hooks/useChatModal'

import LoadingButton from '@mui/lab/LoadingButton'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import Button from '@mui/material/Button'
import ChatIcon from '@/assets/bubble-chat.png'

const BaseButton: React.FC<{
   buttonText: string
   isLoading: boolean
   iconType?: 'addIcon' | 'removeIcon'
   color?: 'error' | 'warning' | 'info'
   withChatButton?: boolean
   friendId?: string
   onClickEvent: () => void
}> = ({
   onClickEvent,
   friendId = '',
   buttonText = 'Jelölés',
   isLoading,
   iconType = 'addIcon',
   color = 'info',
   withChatButton = true,
}) => {
   const mutateChat = useChatModal()

   return withChatButton ? (
      <div
         style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
         }}
      >
         <LoadingButton
            onClick={onClickEvent}
            endIcon={iconType === 'addIcon' ? <PersonAddAlt1Icon /> : <PersonRemoveIcon />}
            loading={isLoading}
            loadingPosition='end'
            variant='outlined'
            color={color}
            fullWidth
         >
            <span>{buttonText}</span>
         </LoadingButton>
         <Button
            onClick={() => mutateChat({ userId: friendId })}
            startIcon={<Image src={ChatIcon} alt='Chat Icon' width={25} height={25} />}
            fullWidth
            variant='text'
         >
            Üzenet
         </Button>
      </div>
   ) : (
      <LoadingButton
         onClick={onClickEvent}
         endIcon={iconType === 'addIcon' ? <PersonAddAlt1Icon /> : <PersonRemoveIcon />}
         loading={isLoading}
         loadingPosition='end'
         variant='outlined'
         color={color}
         fullWidth
      >
         <span>{buttonText}</span>
      </LoadingButton>
   )
}

export default BaseButton
