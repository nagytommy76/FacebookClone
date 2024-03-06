'use client'
import React from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/reduxStore/store'

import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import type { IFriendsResponse } from '../Types'

import ButtonTypes from './ButtonTypes'

const CardButton: React.FC<{ friend: IFriendsResponse }> = ({ friend }) => {
   const userId = useAppSelector((state) => state.auth.userId)

   return (
      <>
         {userId && (
            <CardActions>
               {userId == friend._id ? (
                  <Link style={{ width: '100%' }} href={`/me/${userId}`}>
                     <Button fullWidth variant='outlined' color='success' endIcon={<AccountCircleIcon />}>
                        Profilom
                     </Button>
                  </Link>
               ) : (
                  <div style={{ width: '100%' }}>
                     <ButtonTypes friendFriends={friend.friends} friendId={friend._id} />
                  </div>
               )}
            </CardActions>
         )}
      </>
   )
}

export default CardButton
