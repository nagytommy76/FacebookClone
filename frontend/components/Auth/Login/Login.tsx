import Link from 'next/link'

import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

const Login = () => {
   return (
      <StyledLoginContainer>
         <StyledPaper elevation={3}>
            <TextField id='email' label='E-mail vagy felhasználó' variant='outlined' fullWidth />
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
