import { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import useLoginMutate from './Hooks/useLoginMutate'
import { IInputValues, InputValues } from '../Register/Includes/Types'

import { StyledLoginPaper, StyledAuthContainer, StyledLink } from '../Styles'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

const LoginSnackbar = dynamic(() => import('./Includes/LoginSnackbar'))

const Login = () => {
   const [email, setEmail] = useState<IInputValues>(InputValues)
   const [password, setPassword] = useState<IInputValues>(InputValues)
   const { loginMutate } = useLoginMutate(email, password)

   const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) =>
      setEmail((prevValue) => {
         return { ...prevValue, value: event.target.value }
      })
   const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) =>
      setPassword((prevValue) => {
         return { ...prevValue, value: event.target.value }
      })

   return (
      <StyledAuthContainer>
         <StyledLoginPaper elevation={3}>
            <TextField
               value={email.value}
               onChange={handleSetEmail}
               id='email'
               label='E-mail vagy felhasználó'
               variant='outlined'
               fullWidth
            />
            <TextField
               value={password.value}
               onChange={handleSetPassword}
               id='password'
               label='Jelszó'
               type='password'
               variant='outlined'
               fullWidth
            />
            <Button variant='contained' onClick={(event) => loginMutate(event)} fullWidth>
               Bejelentkezés
            </Button>
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
