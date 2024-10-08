import React from 'react'
import { useAppSelector } from '@/reduxStore/store'
import moment from 'moment'

import Typography from '@mui/material/Typography'

const IsOnline: React.FC<{ chatFirendId: string }> = ({ chatFirendId }) => {
   const isOnlineFriends = useAppSelector((state) => state.chat.isOnlineFriends)
   return (
      <>
         {isOnlineFriends && isOnlineFriends[chatFirendId]?.isActive ? (
            <Typography sx={{ color: '#77c70e' }} variant='body1'>
               online
            </Typography>
         ) : (
            <>
               <Typography sx={{ color: '#fd2b27' }} variant='body1'>
                  offline
               </Typography>
               <Typography variant='caption'>
                  Utoljára elérhető volt:{' '}
                  {isOnlineFriends &&
                     moment(isOnlineFriends[chatFirendId]?.lastSeen).format('YYYY MM. DD. k:mm')}
               </Typography>
            </>
         )}
      </>
   )
}

export default IsOnline
