'use client'
import useRegisterMutate from './Hooks/useRegisterMutate'

import { StyledAuthContainer, StyledRegisterPaper } from '../Styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import DateOfBirth from './Includes/DateOfBirth'
import GenderRadio from './Includes/GenderRadio'

const Register = () => {
   const {
      registerMutate,
      isSuccess,
      isBtnDisabled,
      dateOfBirth,
      email,
      firstName,
      gender,
      password,
      sureName,
      setDateOfBirth,
      setGender,
      setAnyTextStateValues,
   } = useRegisterMutate()

   return (
      <StyledAuthContainer>
         <StyledRegisterPaper elevation={3}>
            <Typography variant='h4' textAlign='center' mb={2}>
               Regisztráció
            </Typography>
            <Stack direction='row' spacing={1}>
               <TextField
                  fullWidth
                  value={sureName.value}
                  onChange={(e) => setAnyTextStateValues(e, 'surename')}
                  error={sureName.isError}
                  helperText={sureName.msg}
                  id='surname'
                  label='Vezetéknév'
                  variant='outlined'
               />
               <TextField
                  fullWidth
                  value={firstName.value}
                  onChange={(e) => setAnyTextStateValues(e, 'firstname')}
                  error={firstName.isError}
                  helperText={firstName.msg}
                  id='firstName'
                  label='Keresztnév'
                  variant='outlined'
               />
            </Stack>
            <TextField
               value={email.value}
               onChange={(e) => setAnyTextStateValues(e, 'email')}
               error={email.isError}
               helperText={email.msg}
               id='email'
               label='E-mail cím'
               variant='outlined'
               fullWidth
            />
            <TextField
               value={password.value}
               onChange={(e) => setAnyTextStateValues(e, 'password')}
               error={password.isError}
               helperText={password.msg}
               id='password'
               label='Jelszó'
               type='password'
               variant='outlined'
               fullWidth
            />
            <DateOfBirth dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
            <GenderRadio gender={gender} setGender={setGender} />
            <Divider />
            <Collapse in={isSuccess} timeout={200} mountOnEnter unmountOnExit>
               <Alert sx={{ mb: 2 }} variant='outlined' severity='success'>
                  <AlertTitle>Sikeres regisztráció!</AlertTitle>
                  <p>{`Sikeres regisztráció a(z) ${email.value} email címmel`}</p>
                  <p>Hamarosan átirányíitunk a belépő oldalra!</p>
               </Alert>
            </Collapse>
            <Button
               disabled={isBtnDisabled}
               onClick={() => registerMutate()}
               variant='contained'
               color='success'
               fullWidth
            >
               Regisztráció
            </Button>
         </StyledRegisterPaper>
      </StyledAuthContainer>
   )
}

export default Register
