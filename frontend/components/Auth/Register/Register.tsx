import { useRef, useState } from 'react'
import { GenderTypes, IDateOfBirth } from './Includes/Types'

import { StyledAuthContainer, StyledRegisterPaper } from '../Styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import DateOfBirth from './Includes/DateOfBirth'
import GenderRadio from './Includes/GenderRadio'

const Register = () => {
   const sureNameRef = useRef<HTMLInputElement>(null)
   const firstNameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)
   const [dateOfBirth, setDateOfBirth] = useState<IDateOfBirth>({
      day: '',
      month: '',
      year: '',
   })
   const [gender, setGender] = useState<GenderTypes>('male')

   const handleRegisterSend = () => {
      console.log(sureNameRef.current?.value)
      console.log(firstNameRef.current?.value)
      console.log(emailRef.current?.value)
      console.log(passwordRef.current?.value)
   }

   return (
      <StyledAuthContainer>
         <StyledRegisterPaper elevation={3}>
            <h1>Regisztráció</h1>
            <Stack direction='row' spacing={1}>
               <TextField inputRef={sureNameRef} id='surname' label='Vezetéknév' variant='outlined' />
               <TextField inputRef={firstNameRef} id='firstName' label='Keresztnév' variant='outlined' />
            </Stack>
            <TextField inputRef={emailRef} id='email' label='E-mail cím' variant='outlined' fullWidth />
            <TextField
               inputRef={passwordRef}
               id='password'
               label='Jelszó'
               type='password'
               variant='outlined'
               fullWidth
            />
            <DateOfBirth dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
            <GenderRadio gender={gender} setGender={setGender} />
            <Button onClick={handleRegisterSend} variant='contained' color='success' fullWidth>
               Regisztráció
            </Button>
         </StyledRegisterPaper>
      </StyledAuthContainer>
   )
}

export default Register
