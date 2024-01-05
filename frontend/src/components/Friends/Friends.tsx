'use client'
import React from 'react'
import useGetFriends from './Hooks/useGetFriends'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import Grid from '@mui/material/Grid'

const Friends = () => {
   const friends = useGetFriends()
   console.log(friends[0])
   return (
      <div style={{ minHeight: '100vh' }}>
         <h1>Barátok komponens, szintén refreshTokennel látható. !!!!!!!444</h1>
         <Grid container spacing={2}>
            {friends.map((friend) => (
               <Grid key={friend._id} item xs={2}>
                  <Card sx={{ maxWidth: 345 }}>
                     <CardMedia
                        sx={{ height: 140 }}
                        image={friend.userDetails.profilePicturePath[0].path}
                        title={`${friend.firstName} ${friend.sureName}`}
                     />
                     <CardContent>
                        <Typography variant='h5'>
                           {friend.sureName} {friend.firstName}
                        </Typography>
                     </CardContent>
                     {/* <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn More</Button>
                     </CardActions> */}
                  </Card>
               </Grid>
            ))}
         </Grid>
      </div>
   )
}

export default Friends
