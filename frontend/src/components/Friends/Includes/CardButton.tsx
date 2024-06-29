'use client'
import React from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/reduxStore/store'

import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import type { IFriendsResponse } from '../Types'

import ButtonTypes from './ButtonTypes'
import FriendsContextProvider from '../Context/FriendContext'

const CardButton: React.FC<{ friend: IFriendsResponse }> = ({ friend }) => {
   const userId = useAppSelector((state) => state.auth.userId)

   return (
      <>
         {userId && (
            <CardActions>
               {userId == friend._id ? (
                  <Link style={{ width: '100%' }} href={`/${userId}`}>
                     <Button fullWidth variant='outlined' color='success' endIcon={<AccountCircleIcon />}>
                        Profilom
                     </Button>
                  </Link>
               ) : (
                  <FriendsContextProvider friend={friend}>
                     <ButtonTypes />
                  </FriendsContextProvider>
               )}
            </CardActions>
         )}
      </>
   )
}

export default CardButton
