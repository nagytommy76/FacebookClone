import React from 'react'
import { RightSection } from '../AboutMeStyles'

import Typography from '@mui/material/Typography'

const MetaDetails = () => {
   return (
      <RightSection>
         <Typography variant='h5' gutterBottom>
            Szülőváros
         </Typography>
         <Typography variant='h5' gutterBottom>
            Jelenlegi Város
         </Typography>
         <Typography variant='h5' gutterBottom>
            Elérhetőségek: (telefon, email, webpage stb)
         </Typography>
      </RightSection>
   )
}

export default MetaDetails
