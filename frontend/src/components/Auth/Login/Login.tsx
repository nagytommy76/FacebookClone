import dynamic from 'next/dynamic'
import useLoginMutate from './Hooks/useLoginMutate'
import useLoginState from './Hooks/useLoginState'
import LoginImage from '@/assets/social_login.jpg'

import {
   StyledLoginForm,
   StyledLeftContainer,
   StyledLoginPaper,
   StyledAuthContainer,
   StyledLink,
   StyledImage,
} from '../Styles'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import SendIcon from '@mui/icons-material/Send'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

const LoginSnackbar = dynamic(() => import('./Includes/LoginSnackbar'))

const Login = () => {
   const { email, handleSetEmail, password, handleSetPassword, setEmail, setPassword } = useLoginState()
   const { loginMutate, isLoading } = useLoginMutate(email.value, password.value, setEmail, setPassword)
   return (
      <StyledAuthContainer>
         <StyledLoginPaper>
            <StyledLeftContainer>
               <StyledLoginForm>
                  <FormControl error={email.isError} variant='outlined' fullWidth>
                     <InputLabel htmlFor='email'>E-mail vagy felhasználó</InputLabel>
                     <OutlinedInput
                        autoFocus
                        id='email'
                        value={email.value}
                        onChange={handleSetEmail}
                        label='E-mail vagy felhasználó'
                        aria-describedby='email-text'
                     />
                     {email.isError && <FormHelperText id='email-text'>Error</FormHelperText>}
                  </FormControl>
                  <FormControl error={password.isError} variant='outlined' fullWidth>
                     <InputLabel htmlFor='password'>Jelszó</InputLabel>
                     <OutlinedInput
                        type='password'
                        id='password'
                        value={password.value}
                        onChange={handleSetPassword}
                        label='Jelszó'
                        aria-describedby='password-text'
                     />
                     {password.isError && <FormHelperText id='password-text'>Error</FormHelperText>}
                  </FormControl>
                  <LoadingButton
                     type='submit'
                     loading={isLoading}
                     loadingPosition='end'
                     endIcon={<SendIcon />}
                     variant='contained'
                     onClick={(event) => loginMutate(event)}
                     fullWidth
                  >
                     Bejelentkezés
                  </LoadingButton>
                  <p>Elfelejtetted a jelszavad?</p>
                  <Divider />
                  <StyledLink href='/register'>
                     <Button variant='contained' color='success' fullWidth>
                        Új fiók létrehozása
                     </Button>
                  </StyledLink>
               </StyledLoginForm>
            </StyledLeftContainer>
            <LoginSnackbar />
            <StyledImage src={LoginImage} alt='login_social_image' />
         </StyledLoginPaper>
      </StyledAuthContainer>
   )
}

export default Login
