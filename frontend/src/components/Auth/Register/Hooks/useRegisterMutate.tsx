import useRegisterState from './useRegisterState'
import { useRouter } from 'next/navigation'
import type { ErrorResponse } from '@/types/AuthTypes'

import { useMutation } from '@tanstack/react-query'
import {
   isAxiosError,
   axiosInstance as axios,
   AxiosResponse,
} from '../../../../utils/axiosSetup/AxiosInstance'

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
      if (data.status === 201) router.push('/login')
      // router.push({
      //    pathname: '/login',
      //    query: { msg: `Sikeres regisztráció a(z) ${email.value} email címmel`, isRegisterSuccess: true },
      // })
   }

   const { mutate } = useMutation({
      mutationKey: ['register'],
      mutationFn: handleRegisterSend,
      onError(error: ErrorResponse) {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors
            // resetAllErrors()
            setAnyErrorMsg(errorResponse)
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
