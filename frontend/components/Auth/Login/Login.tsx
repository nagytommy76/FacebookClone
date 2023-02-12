import { ChangeEvent, useState } from 'react'
import Link from 'next/link'

import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

const Login = () => {
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
   const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

   return (
      <StyledLoginContainer>
         <StyledPaper elevation={3}>
            <TextField
               value={email}
               onChange={handleSetEmail}
               id='email'
               label='E-mail vagy felhasználó'
               variant='outlined'
               fullWidth
            />
            <TextField
               value={password}
               onChange={handleSetPassword}
               id='password'
               label='Jelszó'
               type='password'
               variant='outlined'
               fullWidth
            />
            <Button variant='contained' fullWidth>
               Bejelentkezés
            </Button>
            <p>Elfelejtetted a jelszavad?</p>
            <Divider />
            <StyledLink href='/register'>
               <Button variant='contained' color='success' fullWidth>
                  Új fiók létrehozása
               </Button>
            </StyledLink>
         </StyledPaper>
      </StyledLoginContainer>
   )
}

export default Login

const StyledLoginContainer = styled('section')({
   height: '100%',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
})

const StyledPaper = styled(Paper)({
   padding: 25,
   width: '400px',
   height: '340px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between',
})

export const StyledLink = styled(Link)({
   width: '100%',
})
