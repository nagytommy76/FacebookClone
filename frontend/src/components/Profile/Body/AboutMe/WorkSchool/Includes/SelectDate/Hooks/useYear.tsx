import moment from 'moment'
import { useContext } from 'react'
import { ProfileContext } from '@/components/Profile/Context/ProfileContextProvider'

const useYear = () => {
   const {
      profileReducer: {
         initialUserDataState: {
            userDetails: { dateOfBirth },
         },
      },
   } = useContext(ProfileContext)

   const fillYears = () => {
      let years: number[] = []
      const startDate = new Date().getFullYear()
      for (let i = startDate; i >= moment(dateOfBirth).year(); i--) {
         years.push(i)
      }
      return years
   }

   return fillYears
}

export default useYear
