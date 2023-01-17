import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

const Footer = () => {
   return (
      <StyledFooter elevation={2}>
         <Typography variant='h6'>Készítette: © Nagy Tamás 2023</Typography>
         <Stack direction='row' spacing={0} pt={1}>
            <IconButton aria-label='linkedIn' size='large'>
               <LinkedInIcon fontSize='large' />
            </IconButton>
            <IconButton aria-label='github' size='large'>
               <GitHubIcon fontSize='large' />
            </IconButton>
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
