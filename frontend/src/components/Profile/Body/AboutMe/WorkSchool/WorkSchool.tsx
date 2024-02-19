import React from 'react'

import { WorkSchoolItems } from './Styles'
import { RightSection } from '../AboutMeStyles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import WorkSchoolInputs from './Includes/WorkSchoolInputs'
import WorkPlaces from './WorkPlaces/WorkPlaces'

const WorkSchool = () => {
   return (
      <RightSection>
         <WorkSchoolItems>
            <WorkSchoolInputs />
            <WorkPlaces />
         </WorkSchoolItems>
         <WorkSchoolItems>
            <Typography variant='h5'>Főiskola/Egyetem</Typography>
            <Button variant='text' color='warning' startIcon={<AddCircleOutlineIcon />}>
               Főiskola/Egyetem megadása
            </Button>
            <small>Ide jön a már megadott elem, ha van presze</small>
         </WorkSchoolItems>
         <WorkSchoolItems>
            <Typography variant='h5'>Középiskola</Typography>
            <Button variant='text' color='warning' startIcon={<AddCircleOutlineIcon />}>
               Középiskola megadása
            </Button>
            <small>Ide jön a már megadott elem, ha van presze</small>
         </WorkSchoolItems>
      </RightSection>
   )
}

export default WorkSchool
