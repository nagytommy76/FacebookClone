'use client'
import React from 'react'
import moment from 'moment'
import useGetFriends from './Hooks/useGetFriends'

import Button from '@mui/material/Button'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { FriendsContainer, GridContainer, GridItem } from './Styles'

import CardHeader from './Includes/CardHeader'

const Friends = () => {
   const friends = useGetFriends()
   return (
      <FriendsContainer>
         <GridContainer>
            {friends.map((friend) => (
               <GridItem key={friend._id}>
                  <Card>
                     <CardHeader
                        userId={friend._id}
                        profilePicture={friend.userDetails.profilePicturePath[0].path}
                     />
                     <CardContent>
                        <Typography variant='h5' gutterBottom>
                           {friend.sureName} {friend.firstName}
                        </Typography>
                        <Typography variant='subtitle2'>Lakhely: ....</Typography>
                        <Typography variant='subtitle2'>Munkahely: ....</Typography>
                        <Typography variant='subtitle2'>Születés: ....</Typography>
                        <Typography variant='subtitle2'>
                           Létrehozva: {moment(friend.createdAt).format('YYYY MMMM D ')}
                        </Typography>
                     </CardContent>
                     <CardActions>
                        <Button variant='outlined' color='info' startIcon={<PersonAddAlt1Icon />}>
                           Jelölés
                        </Button>
                     </CardActions>
                  </Card>
               </GridItem>
            ))}
         </GridContainer>
      </FriendsContainer>
   )
}

export default Friends
