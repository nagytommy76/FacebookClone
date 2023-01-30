import { useRef, useState } from 'react'
import { AxiosError, axiosInstance as axios } from '../../../axiosSetup/AxiosInstance'
import { GenderTypes, IDateOfBirth } from './Includes/Types'

import { useMutation } from '@tanstack/react-query'

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

   const handleRegisterSend = async () => {
      return await axios.post('/auth/register', {
         sureName: sureNameRef.current?.value,
         firstName: firstNameRef.current?.value,
         email: emailRef.current?.value,
         password: passwordRef.current?.value,
         dateOfBirth,
         gender,
      })
   }

   const { mutate, error, isError } = useMutation({
      mutationKey: ['register'],
      mutationFn: handleRegisterSend,
   })
   if (isError) {
      // console.log((error as AxiosError).response.data.errors)
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
            <Button onClick={() => mutate()} variant='contained' color='success' fullWidth>
               Regisztráció
            </Button>
         </StyledRegisterPaper>
      </StyledAuthContainer>
   )
}

export default Register
