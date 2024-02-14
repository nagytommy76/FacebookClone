import { useContext } from 'react'
import moment from 'moment'
import { ProfileContext } from '@/ProfileContext/ProfileContextProvider'
import { StyledWorkItem } from './Styles'

import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'

const WorkPlaces = () => {
   const {
      profileReducer: {
         initialUserDataState: {
            userDetails: { workPlaces },
         },
      },
   } = useContext(ProfileContext)

   return (
      <section>
         <Typography variant='h6' mb={2} mt={1.5}>
            Eddigi munkahelyek:
         </Typography>
         {workPlaces.map((workplace) => (
            <StyledWorkItem key={workplace._id}>
               <IconButton
                  sx={{ position: 'absolute', right: 5, top: 5 }}
                  color='warning'
                  aria-label='more-options'
               >
                  <MoreVertIcon />
               </IconButton>
               <Typography fontWeight={400} variant='subtitle1'>
                  Vállalat: {workplace.companyName}
               </Typography>
               <Typography>Pozició: {workplace.position}</Typography>
               <Typography>Város: {workplace.city}</Typography>
               {workplace.description.length > 0 && <Typography>Leírás: {workplace.description}</Typography>}
               <Typography variant='subtitle2'>
                  {moment(workplace.startDate).format('YYYY MMMM Do')} -{' '}
                  {workplace.endDate === null ? 'Jelenleg' : moment(workplace.endDate).format('YYYY MMMM Do')}
               </Typography>
            </StyledWorkItem>
         ))}
      </section>
   )
}

export default WorkPlaces
