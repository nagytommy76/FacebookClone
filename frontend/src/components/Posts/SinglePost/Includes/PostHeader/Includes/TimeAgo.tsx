import React from 'react'
import moment from 'moment'
import useMoment from '@/src/hooks/useMoment'

import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const TimeAgo: React.FC<{ createdAt: string }> = ({ createdAt }) => {
   const currentTime = useMoment(createdAt)
   return (
      <Tooltip title={moment(createdAt).format('YYYY MMMM D dddd, kk:mm')}>
         <Typography variant='body2'>{currentTime}</Typography>
      </Tooltip>
   )
}

export default TimeAgo
