'use client'
import React from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/reduxStore/store'
import useFriendRequest from '../Hooks/useFriendRequest'

import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import { IFriendsResponse } from '../Types'

const CardButton: React.FC<{ friend: IFriendsResponse }> = ({ friend }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const { friendRequestMutate, loading } = useFriendRequest(friend._id)

   const isFriendRequestSendByMeAndNotAccepted = friend.friends.find(
      (item) => item.userId == userId && item.isAccepted === false
   )

   const myFriendRequest = friend.friends.find((item) => item.userId === userId)

   return (
      <CardActions>
         {userId == friend._id ? (
            <Link style={{ width: '100%' }} href={`/me/${userId}`}>
               <Button fullWidth variant='outlined' color='success' endIcon={<AccountCircleIcon />}>
                  Profilom
               </Button>
            </Link>
         ) : (
            <div style={{ width: '100%' }}>
               {isFriendRequestSendByMeAndNotAccepted == undefined && (
                  <LoadingButton
                     onClick={() => friendRequestMutate()}
                     endIcon={<PersonAddAlt1Icon />}
                     loading={loading}
                     loadingPosition='end'
                     variant='outlined'
                     color='info'
                     fullWidth
                  >
                     <span>Jelölés</span>
                  </LoadingButton>
               )}
               {isFriendRequestSendByMeAndNotAccepted !== undefined && (
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
               )}
               {myFriendRequest !== undefined && (
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
               )}
            </div>
         )}
      </CardActions>
   )
}

export default CardButton
