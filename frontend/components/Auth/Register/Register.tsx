import { StyledAuthContainer, StyledRegisterPaper } from '../Styles'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import DateOfBirth from './Includes/DateOfBirth'

const Register = () => {
   return (
      <StyledAuthContainer>
         <StyledRegisterPaper elevation={3}>
            <h1>Regisztráció</h1>
            <Stack direction='row' spacing={1}>
               <TextField id='surname' label='Vezetéknév' variant='outlined' />
               <TextField id='firstName' label='Keresztnév' variant='outlined' />
            </Stack>
            <TextField id='email' label='E-mail cím' variant='outlined' fullWidth />
            <TextField id='password' label='Jelszó' type='password' variant='outlined' fullWidth />
            <DateOfBirth />
            <Button variant='contained' color='success' fullWidth>
               Regisztráció
            </Button>
         </StyledRegisterPaper>
      </StyledAuthContainer>
   )
}

export default Register
