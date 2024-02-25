'use client'
import React from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/reduxStore/store'
import useFriendRequest from '../Hooks/useFriendRequest'

import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import type { IFriendsResponse } from '../Types'

import ButtonTypes from './ButtonTypes'

const CardButton: React.FC<{ friend: IFriendsResponse }> = ({ friend }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const { friendRequestMutate, loading, cardButtonType } = useFriendRequest(friend._id)

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
               <ButtonTypes
                  buttonType={cardButtonType}
                  loading={loading}
                  friendRequestMutate={friendRequestMutate}
               />
            </div>
         )}
      </CardActions>
   )
}

export default CardButton
