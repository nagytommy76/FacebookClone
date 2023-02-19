import React, { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse, isAxiosError } from '../../../../axiosSetup/AxiosInstance'
import { IInputValues, InputValues } from '../../Register/Includes/Types'

const useLoginMutate = () => {
   const [email, setEmail] = useState<IInputValues>(InputValues)
   const [password, setPassword] = useState<IInputValues>(InputValues)

   const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) =>
      setEmail((prevValue) => {
         return { ...prevValue, value: event.target.value }
      })
   const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) =>
      setPassword((prevValue) => {
         return { ...prevValue, value: event.target.value }
      })

   const handleLoginSend = async (event: React.FormEvent): Promise<AxiosResponse<{ msg: string }>> => {
      event.preventDefault()
      return await axios.post('/auth/login', {
         email: email.value,
         password: password.value,
      })
   }

   const { mutate, isLoading, data } = useMutation({
      mutationKey: ['login'],
      mutationFn: handleLoginSend,
      onSuccess: (data) => {
         console.log(data.data)
      },
      onError: (error) => {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors as IInputValues[]
            console.log(errorResponse)
            errorResponse.map((value) => {
               if (value.param === 'email') {
                  setEmail((prevValues) => {
                     return {
                        ...prevValues,
                        msg: value.msg,
                        isError: true,
                     }
                  })
               } else {
                  setPassword((prevValues) => {
                     return {
                        ...prevValues,
                        msg: value.msg,
                        isError: true,
                     }
                  })
               }
            })
         }
      },
   })

   return {
      email,
      password,
      handleSetEmail,
      handleSetPassword,
      loginMutate: mutate,
      isLoading,
      data,
   }
}

export default useLoginMutate
