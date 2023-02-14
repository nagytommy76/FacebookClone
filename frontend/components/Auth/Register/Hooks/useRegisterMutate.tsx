import useRegisterState from './useRegisterState'
import { useRouter } from 'next/router'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError, axiosInstance as axios, AxiosResponse } from '../../../../axiosSetup/AxiosInstance'
import { IInputValues } from '../Includes/Types'

const useRegisterMutate = () => {
   const {
      dateOfBirth,
      email,
      firstName,
      gender,
      password,
      sureName,
      setDateOfBirth,
      setGender,
      setAnyTextStateValues,
      setAnyErrorMsg,
      resetAllErrors,
   } = useRegisterState()
   const router = useRouter()

   const handleRegisterSend = async () => {
      resetAllErrors()
      return await axios.post('/auth/register', {
         sureName: sureName.value,
         firstName: firstName.value,
         email: email.value,
         password: password.value,
         dateOfBirth: { day: dateOfBirth.day, month: dateOfBirth.month, year: dateOfBirth.year },
         gender,
      })
   }

   const onSuccess = (data: AxiosResponse<any, any>) => {
      if (data.status === 201)
         router.push({ pathname: '/login', query: { msg: 'Sikeres regisztráció', isRegisterSuccess: true } })
   }

   const { mutate } = useMutation({
      mutationKey: ['register'],
      mutationFn: handleRegisterSend,
      onError(error) {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors as IInputValues[]
            errorResponse.map((value) => setAnyErrorMsg(value))
         }
      },
      onSuccess,
   })

   return {
      registerMutate: mutate,
      dateOfBirth,
      email,
      firstName,
      gender,
      password,
      sureName,
      setAnyTextStateValues,
      setDateOfBirth,
      setGender,
   }
}

export default useRegisterMutate
