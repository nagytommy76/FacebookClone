import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/hu'
moment.updateLocale('hu', {
   relativeTime: {
      s: '1 mp',
      ss: '%s mp',
      m: '1 p',
      mm: '%d p',
      h: '1 ó',
      hh: '%d ó',
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
   const [currentInterval, setCurrentInterval] = useState<number>(6000000)

   useEffect(() => {
      setCurrentTime(moment(answeredAt).fromNow(true))
      const interval = setInterval(() => {
         const elapsedTimeString = moment(answeredAt).fromNow(true)
         // setCurrentInterval(10000)
         const regexTime = new RegExp(/d+ ó $/)
         // console.log(regexTime.test(elapsedTimeString))
         if (regexTime.test(elapsedTimeString)) {
         }
         setCurrentTime(elapsedTimeString)
      }, currentInterval)
      return () => clearInterval(interval)
   }, [answeredAt, currentInterval, currentTime])

   return currentTime
}

export default useMoment
