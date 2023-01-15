import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

const Footer = () => {
   return (
      <StyledFooter>
         <Typography>Készítette: © Nagy Tamás 2023</Typography>
         <p>social ikonok helye!!!</p>
      </StyledFooter>
   )
}

export default Footer

const StyledFooter = styled('footer')({
   width: '100%',
   height: '80px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
})
