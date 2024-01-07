'use client'
import React from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/src/utils/redux/store'

import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const CardButton: React.FC<{ friendId: string }> = ({ friendId }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   return (
      <CardActions>
         {userId == friendId ? (
            <Link style={{ width: '100%' }} href={`/me/${userId}`}>
               <Button fullWidth variant='outlined' color='success' startIcon={<AccountCircleIcon />}>
                  Profilom
               </Button>
            </Link>
         ) : (
            <Button fullWidth variant='outlined' color='info' startIcon={<PersonAddAlt1Icon />}>
               Jelölés
            </Button>
         )}
      </CardActions>
   )
}

export default CardButton
