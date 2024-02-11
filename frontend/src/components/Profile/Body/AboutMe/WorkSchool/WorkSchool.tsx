import React from 'react'

import { WorkSchoolSection, WorkSchoolItems } from './Styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import WorkSchoolInputs from './Includes/WorkSchoolInputs'

const WorkSchool = () => {
   return (
      <WorkSchoolSection>
         <WorkSchoolItems>
            <WorkSchoolInputs />
            <p>IDE kéne megjeleníteni a már meglévő munkahelyeket</p>
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
      </WorkSchoolSection>
   )
}

export default WorkSchool
