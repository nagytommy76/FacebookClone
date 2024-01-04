import React from 'react'

import { styled } from '@mui/material'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'

const StyledContainer = styled('section')({
   height: '100vh',
})

const Friends = () => {
   return (
      <StyledContainer>
         <h1>Barátok komponens, szintén refreshTokennel látható</h1>
      </StyledContainer>
   )
}

export default Friends
