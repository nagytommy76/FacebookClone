import React from 'react'
import moment from 'moment'
import type { IFriendsResponse } from './Types'

import Box from '@mui/system/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { gridBoxSx, containerSx } from './Styles'

import CardButton from './Includes/CardButton'
import CardHeader from './Includes/CardHeader'

const Friends: React.FC<{ friends: IFriendsResponse[] }> = ({ friends }) => {
   return (
      <section style={containerSx}>
         <Box component='section' sx={gridBoxSx}>
            {friends.map((friend) => (
               <div id={friend._id} style={{ width: '300px', height: '450px' }} key={friend._id}>
                  <Card>
                     <CardHeader userId={friend._id} profilePicture={friend.selectedProfilePicture[0].path} />
                     <CardContent>
                        <Typography fontWeight={500} variant='h5' gutterBottom>
                           {friend.sureName} {friend.firstName}
                        </Typography>
                        {friend.lastWorkPlace.length > 0 ? (
                           <Typography gutterBottom variant='subtitle2' fontWeight={300}>
                              Munkahely: {friend.lastWorkPlace[0].companyName},{' '}
                              {friend.lastWorkPlace[0].position}
                           </Typography>
                        ) : (
                           <Typography gutterBottom variant='subtitle2' fontWeight={300}>
                              Munkahely: Nincs megadva
                           </Typography>
                        )}
                        <Typography gutterBottom variant='subtitle2' fontWeight={300}>
                           Születés: {moment(friend.dateOfBirth).format('YYYY MMMM Do ')}
                           <Typography variant='caption' fontWeight={400}>
                              ({moment(Date.now()).year() - moment(friend.dateOfBirth).year()} éves)
                           </Typography>
                        </Typography>
                        <Typography gutterBottom variant='subtitle2' fontWeight={300}>
                           Létrehozva: {moment(friend.createdAt).format('YYYY MMMM Do ')}
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
