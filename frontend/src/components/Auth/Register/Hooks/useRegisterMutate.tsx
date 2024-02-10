import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError, axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { ErrorResponse } from '@/types/AuthTypes'

import { useRouter } from 'next/navigation'
import useRegisterState from './useRegisterState'
import useCountDown from './useCountDown'

const useRegisterMutate = () => {
   const [isSuccess, setIsSuccess] = useState<boolean>(false)
   const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false)
   const { count, startCountDownTimer } = useCountDown()

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
      setIsSuccess(true)
      setIsBtnDisabled(true)
      startCountDownTimer()
      setTimeout(() => {
         if (data.status === 201) router.push('/login')
      }, count * 1000)
   }

   const { mutate } = useMutation({
      mutationKey: ['register'],
      mutationFn: handleRegisterSend,
      onMutate() {
         resetAllErrors()
      },
      onError(error: ErrorResponse) {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors
            setAnyErrorMsg(errorResponse)
         }
      },
      onSuccess,
   })

   return {
      registerMutate: mutate,
      isSuccess,
      count,
      isBtnDisabled,
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
