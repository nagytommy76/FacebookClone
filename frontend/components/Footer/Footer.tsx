import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const Footer = () => {
   return (
      <Paper elevation={0} square>
         <StyledFooter>
            <Typography>Készítette: © Nagy Tamás 2023</Typography>
            <p>social ikonok helye!!!</p>
         </StyledFooter>
      </Paper>
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
