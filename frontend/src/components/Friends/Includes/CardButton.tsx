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

const CardButton: React.FC<{ friendId: string }> = ({ friendId }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const { friendRequestMutate, loading } = useFriendRequest(friendId)
   return (
      <CardActions>
         {userId == friendId ? (
            <Link style={{ width: '100%' }} href={`/me/${userId}`}>
               <Button fullWidth variant='outlined' color='success' endIcon={<AccountCircleIcon />}>
                  Profilom
               </Button>
            </Link>
         ) : (
            <div>
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
               <LoadingButton
                  onClick={() => {}}
                  endIcon={<PersonRemoveIcon />}
                  loading={loading}
                  loadingPosition='end'
                  variant='outlined'
                  color='error'
                  fullWidth
               >
                  <span>Jelölés törlése</span>
               </LoadingButton>
            </div>
         )}
      </CardActions>
   )
}

export default CardButton
