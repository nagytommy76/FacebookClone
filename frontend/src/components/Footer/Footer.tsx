import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

const Footer = () => {
   return (
      <StyledFooter elevation={2}>
         <Typography variant='h6'>Készítette: © Nagy Tamás 2023</Typography>
         <Stack direction='row' spacing={1} pt={1}>
            <a href='https://www.linkedin.com/in/tamasnagy93' target='_blank'>
               <LinkedInIcon sx={{ fontSize: 45, cursor: 'pointer', ':hover': { color: '#0a66c2' } }} />
            </a>
            <a href='https://github.com/nagytommy76' target='_blank'>
               <GitHubIcon sx={{ fontSize: 45, cursor: 'pointer' }} />
            </a>
         </Stack>
      </StyledFooter>
   )
}

export default Footer

const StyledFooter = styled(Paper)({
   // backgroundColor: '#222',
   // color: '#FFF',
   width: '100%',
   padding: '1rem 0',

   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
})

const StyledSocialRow = styled('span')({})
