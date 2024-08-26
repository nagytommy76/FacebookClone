import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/hu'

moment.relativeTimeThreshold('s', 59)
moment.relativeTimeThreshold('m', 59)
moment.relativeTimeThreshold('h', 24)
moment.relativeTimeThreshold('d', 29)
moment.relativeTimeThreshold('M', 11)

moment.updateLocale('hu', {
   relativeTime: {
      s: '1 másodperce',
      ss: '%d másodperce',
      m: '1 perce',
      mm: '%d perce',
      h: '1 órája',
      hh: '%d órája',
      d: '1 napja',
      dd: '%d napja',
      M: '1 hónapja',
      MM: '%d hónapja',
      y: '1 éve',
      yy: '%d éve',
   },
})

// moment.updateLocale('hu', {
//    relativeTime: {
//       s: '1 mp',
//       ss: '%d mp',
//       m: '1 p',
//       mm: '%d p',
//       h: '1 ó.',
//       hh: '%d ó.',
//       d: '1 n',
//       dd: '%d n',
//       M: '1 hó',
//       MM: '%d hó',
//       y: '1 é',
//       yy: '%d é',
//    },
// })

const useMoment = (answeredAt: string) => {
   const [tinmeFromNow, setTimeFromNow] = useState(moment(answeredAt).fromNow(true))

   useEffect(() => {
      const updateTimeFromNow = () => {
         setTimeFromNow(moment(answeredAt).fromNow(true))
      }

      // Calculate the interval dynamically based on the current time difference
      const getRefreshInterval = () => {
         const diffInSeconds = moment().diff(answeredAt, 'seconds')
         switch (true) {
            case diffInSeconds < 60: // within 1 minute
               return 30000 // refresh every 30 seconds
            case diffInSeconds < 60 && diffInSeconds > 600: // between 1 and 10 minutes
               return 60000 // Refresh every minute
            case diffInSeconds < 600 && diffInSeconds > 1800: // between 10 and 30 minutes
               return 1800000 // Refresh every 30 minutes
            default:
               return 3600000
         }
      }
      // Update the time initially
      updateTimeFromNow()
      // Set the interval
      const interval = setInterval(updateTimeFromNow, getRefreshInterval())
      // Cleanup the interval on component unmount
      return () => clearInterval(interval)
   }, [answeredAt])

   return tinmeFromNow
}

export default useMoment
