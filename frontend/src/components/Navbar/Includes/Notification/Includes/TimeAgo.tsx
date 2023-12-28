import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import moment from 'moment'

moment.relativeTimeThreshold('s', 59)
moment.relativeTimeThreshold('m', 59)
moment.relativeTimeThreshold('h', 24)
moment.relativeTimeThreshold('d', 29)
moment.relativeTimeThreshold('M', 11)

const TimeAgo: React.FC<{ createdAt: string }> = ({ createdAt }) => {
   const [currentTime, setCurrentTime] = useState('')

   useEffect(() => {
      moment.updateLocale('hu', {
         relativeTime: {
            s: '1 mp',
            ss: '%d mp',
            m: '1 perce',
            mm: '%d p',
            h: '1 órája.',
            hh: '%d ó.',
            d: '1 napja',
            dd: '%d n',
            M: '1 hónapja',
            MM: '%d hó',
            y: '1 é',
            yy: '%d é',
         },
      })
      setCurrentTime(moment(createdAt).fromNow(true))
   }, [createdAt])

   return (
      <Typography variant='body1' sx={{ color: '#719aeb' }}>
         {currentTime}
      </Typography>
   )
}

export default TimeAgo
