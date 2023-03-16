import React from 'react'
import { MainPageContainer } from './Style'

import Typography from '@mui/material/Typography'

const MainPage = () => {
   return (
      <MainPageContainer>
         <Typography color='primary' variant='h1'>
            Ez a főoldal és csak belépve látom
         </Typography>
      </MainPageContainer>
   )
}

export default MainPage
