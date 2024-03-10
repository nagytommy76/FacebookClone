import React from 'react'
import type { NotificationTypes } from '../Types'

import Typography from '@mui/material/Typography'

const NotificationText: React.FC<{ notificationTypes: NotificationTypes }> = ({ notificationTypes }) => {
   switch (notificationTypes) {
      case 'isComment':
         return (
            <Typography variant='caption' gutterBottom>
               Kommentelt a bejegyzésedhez:
            </Typography>
         )
      case 'isCommentLike':
         return (
            <Typography variant='caption' gutterBottom>
               Likeolta a kommented:
            </Typography>
         )
      case 'isPostLike':
         return (
            <Typography variant='caption' gutterBottom>
               Likeolta a bejegyzésedet:
            </Typography>
         )
      case 'isFriend':
         return (
            <Typography variant='caption' gutterBottom>
               Barátfelkérés küldött neked!
            </Typography>
         )
      default:
         return <></>
   }
}

export default NotificationText
