import React from 'react'
import moment from 'moment'
import type { IFriendsResponse } from './Types'
import ProfileImage from '@/assets/facebook-profile.jpg'

import Box from '@mui/system/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { gridBoxSx, containerSx } from './Styles'

import CardButton from './Includes/CardButton'
import CardHeader from './Includes/CardHeader'
const Friends: React.FC<{ friends: IFriendsResponse[] }> = ({ friends }) => {
   // console.log(friends)
   return (
      <section style={containerSx}>
         <Box component='section' sx={gridBoxSx}>
            {friends.map((friend) => (
               <div style={{ width: '300px', height: '420px' }} key={friend._id}>
                  <Card>
                     <CardHeader
                        userId={friend._id}
                        profilePicture={friend.selectedProfilePicture[0]?.path || ProfileImage.src}
                     />
                     <CardContent>
                        <Typography variant='h5' gutterBottom>
                           {friend.sureName} {friend.firstName}
                        </Typography>
                        <Typography variant='subtitle2' fontWeight={100}>
                           Lakhely: ....
                        </Typography>
                        <Typography variant='subtitle2' fontWeight={100}>
                           Munkahely: ................
                        </Typography>
                        <Typography variant='subtitle2' fontWeight={100}>
                           Születés: ....
                        </Typography>
                        <Typography variant='subtitle2' fontWeight={100}>
                           Létrehozva: {moment(friend.createdAt).format('YYYY MMMM D ')}
                        </Typography>
                     </CardContent>
                     <CardButton friend={friend} />
                  </Card>
               </div>
            ))}
         </Box>
      </section>
   )
}

export default Friends
