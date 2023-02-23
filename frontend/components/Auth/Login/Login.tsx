import dynamic from 'next/dynamic'
import useLoginMutate from './Hooks/useLoginMutate'

import { StyledLoginPaper, StyledAuthContainer, StyledLink } from '../Styles'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

const LoginSnackbar = dynamic(() => import('./Includes/LoginSnackbar'))

const Login = () => {
   const { email, password, handleSetEmail, handleSetPassword, loginMutate, isLoading } = useLoginMutate()

   return (
      <StyledAuthContainer>
         <StyledLoginPaper elevation={3}>
            <TextField
               value={email.value}
               onChange={handleSetEmail}
               error={email.isError}
               helperText={email.msg}
               id='email'
               label='E-mail vagy felhasználó'
               variant='outlined'
               fullWidth
            />
            <TextField
               value={password.value}
               onChange={handleSetPassword}
               error={password.isError}
               helperText={password.msg}
               id='password'
               label='Jelszó'
               type='password'
               variant='outlined'
               fullWidth
            />
            <LoadingButton
               loading={isLoading}
               loadingPosition='end'
               variant='contained'
               onClick={(event) => loginMutate(event)}
               fullWidth>
               Bejelentkezés
            </LoadingButton>
            <p>Elfelejtetted a jelszavad?</p>
            <Divider />
            <StyledLink href='/register'>
               <Button variant='contained' color='success' fullWidth>
                  Új fiók létrehozása
               </Button>
            </StyledLink>
         </StyledLoginPaper>
         <LoginSnackbar />
      </StyledAuthContainer>
   )
}

export default Login
