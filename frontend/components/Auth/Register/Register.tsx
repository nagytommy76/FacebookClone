import { useState } from 'react'
import { axiosInstance as axios, isAxiosError } from '../../../axiosSetup/AxiosInstance'
import { GenderTypes, IDateOfBirth, IInputValues, InputValues } from './Includes/Types'

import { useMutation } from '@tanstack/react-query'

import { StyledAuthContainer, StyledRegisterPaper } from '../Styles'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import DateOfBirth from './Includes/DateOfBirth'
import GenderRadio from './Includes/GenderRadio'

const Register = () => {
   const [sureName, setSureName] = useState<IInputValues>(InputValues)
   const [firstName, setFirstName] = useState<IInputValues>(InputValues)
   const [email, setEmail] = useState<IInputValues>(InputValues)
   const [password, setPassword] = useState<IInputValues>(InputValues)
   const [dateOfBirth, setDateOfBirth] = useState<IDateOfBirth>({
      day: '',
      month: '',
      year: '',
   })
   const [gender, setGender] = useState<GenderTypes>('male')

   const handleRegisterSend = async () => {
      return await axios.post('/auth/register', {
         sureName: sureName.value,
         firstName: firstName.value,
         email: email.value,
         password: password.value,
         dateOfBirth,
         gender,
      })
   }

   const { mutate } = useMutation({
      mutationKey: ['register'],
      mutationFn: handleRegisterSend,
      onError(error) {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors as IInputValues[]
            console.log(errorResponse)
            errorResponse.map((value) => {
               switch (value.param) {
                  case 'email':
                     setEmail((prevValue) => {
                        return { ...prevValue, isError: true, msg: value.msg, param: value.param }
                     })
                     break
               }
            })
         }
      },
   })

   return (
      <StyledAuthContainer>
         <StyledRegisterPaper elevation={3}>
            <h1>Regisztráció</h1>
            <Stack direction='row' spacing={1}>
               <TextField value={sureName.value} id='surname' label='Vezetéknév' variant='outlined' />
               <TextField value={firstName.value} id='firstName' label='Keresztnév' variant='outlined' />
            </Stack>
            <TextField
               value={email.value}
               onChange={(e) => setEmail({ ...email, value: e.target.value })}
               error={email.isError}
               helperText={email.msg}
               id='email'
               label='E-mail cím'
               variant='outlined'
               fullWidth
            />
            <TextField
               value={password.value}
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
