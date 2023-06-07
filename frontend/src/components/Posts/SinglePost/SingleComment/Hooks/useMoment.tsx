import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/hu'
moment.locale('hu', {
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

const useMoment = (answeredAt: string | undefined) => {
   const [currentTime, setCurrentTime] = useState(moment(answeredAt).fromNow(true))
   const [currentInterval, setCurrentInterval] = useState<number>(60000)
   setInterval(() => {
      const elapsedTimeString = moment(answeredAt).fromNow(true)
      if (new RegExp(/^mp\d+$/)) {
         // console.log('regex')
      }
      setCurrentTime(elapsedTimeString)
   }, currentInterval)

   return currentTime
}

export default useMoment
