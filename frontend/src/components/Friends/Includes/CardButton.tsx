'use client'
import React from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/reduxStore/store'

import useFriendRequest from '../Hooks/useFriendRequest'
import useFriendWithdraw from '../Hooks/useFriendWithdraw'
import useFriendConfirm from '../Hooks/useFriendConfirm'

import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import type { IFriendsResponse } from '../Types'

import ButtonTypes from './ButtonTypes'

const CardButton: React.FC<{ friend: IFriendsResponse }> = ({ friend }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const { friendRequestMutate, setCardButtonType, loading, cardButtonType } = useFriendRequest(friend._id)
   useFriendWithdraw(friend.friends, setCardButtonType)
   useFriendConfirm(friend.friends, setCardButtonType)

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
