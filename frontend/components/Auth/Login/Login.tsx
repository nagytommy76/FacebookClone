import Link from 'next/link'
import { StyledAuthContainer, StyledPaper } from '../Styles'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

const Login = () => {
   return (
      <StyledAuthContainer>
         <StyledPaper elevation={3}>
            <h1>Bejelentkezés</h1>
            <TextField id='emailOrUsername' label='E-mail vagy felhasználó' variant='outlined' fullWidth />
            <TextField id='password' label='Jelszó' type='password' variant='outlined' fullWidth />
            <Button variant='contained' fullWidth>
               Bejelentkezés
            </Button>
            <p>Elfelejtetted a jelszavad?</p>
            <Divider />
            <Button variant='contained' color='success' fullWidth>
               <Link href='/register'>Új fiók létrehozása</Link>
            </Button>
         </StyledPaper>
      </StyledAuthContainer>
   )
}

export default Login
