import Image from 'next/image'

import { useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import useChatModal from '@/hooks/useChatModal'
import { useAppSelector } from '@/reduxStore/store'

import ChatIcon from '@/assets/bubble-chat.png'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import ProfileBtn from './ProfileBtn'

const ButtonStack = () => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      postsReducer: {
         singlePost: {
            userId: { _id },
         },
      },
   } = useContext(PostContext)
   const mutateChat = useChatModal()
   return (
      <Stack m={1} spacing={2} direction='row'>
         {userId === _id ? (
            <ProfileBtn userId={_id} />
         ) : (
            <>
               <Button fullWidth variant='contained'>
                  Ismerősök
               </Button>
               <Button
                  onClick={() => mutateChat({ userId: _id })}
                  startIcon={<Image src={ChatIcon} alt='Chat Icon' width={25} height={25} />}
                  fullWidth
                  variant='text'
               >
                  Üzenet
               </Button>
            </>
         )}
      </Stack>
   )
}

export default ButtonStack
