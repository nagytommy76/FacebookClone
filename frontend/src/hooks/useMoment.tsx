import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/hu'

moment.relativeTimeThreshold('s', 59)
moment.relativeTimeThreshold('m', 59)
moment.relativeTimeThreshold('h', 24)
moment.relativeTimeThreshold('d', 29)
moment.relativeTimeThreshold('M', 11)

/**
 *  moment.updateLocale('hu', {
         relativeTime: {
            s: '1 másodperce',
            ss: '%d másodperce',
            m: '1 perce',
            mm: '%d perce',
            h: '1 órája.',
            hh: '%d órája.',
            d: '1 napja',
            dd: '%d napja',
            M: '1 hónapja',
            MM: '%d hónapja',
            y: '1 éve',
            yy: '%d éve',
         },
      })
 */

moment.updateLocale('hu', {
   relativeTime: {
      s: '1 mp',
      ss: '%d mp',
      m: '1 p',
      mm: '%d p',
      h: '1 ó.',
      hh: '%d ó.',
      d: '1 n',
      dd: '%d n',
      M: '1 hó',
      MM: '%d hó',
      y: '1 é',
      yy: '%d é',
   },
})

const useMoment = (answeredAt: string) => {
   const [currentTime, setCurrentTime] = useState('')
   const [currentInterval, setCurrentInterval] = useState<number>(1000)

   useEffect(() => {
      setCurrentTime(moment(answeredAt).fromNow(true))
      const interval = setInterval(() => {
         if (currentTime.endsWith('p')) {
            setCurrentInterval(60000) // 1 minute
         }
         if (currentTime.endsWith('ó.')) {
            setCurrentInterval(60000 * 60) // 1 hour
         }
         if (currentTime.endsWith('n')) {
            setCurrentInterval(86400000) // 1 day
         }
         if (currentTime.endsWith('hó')) {
            setCurrentInterval(2629746000) // 1 month
         }

         const elapsedTimeString = moment(answeredAt).fromNow(true)
         setCurrentTime(elapsedTimeString)
      }, currentInterval)

      return () => clearInterval(interval)
   }, [answeredAt, currentInterval, currentTime])

   return currentTime
}

export default useMoment
