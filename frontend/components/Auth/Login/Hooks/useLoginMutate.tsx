import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '../../../../axiosSetup/AxiosInstance'
import { IInputValues } from '../../Register/Includes/Types'

const useLoginMutate = (email: IInputValues, password: IInputValues) => {
   const handleLoginSend = async (event: React.FormEvent) => {
      event.preventDefault()
      return await axios.post('/auth/login', {
         email: email.value,
         password: password.value,
      })
   }

   const { mutate, isLoading } = useMutation({
      mutationKey: ['login'],
      mutationFn: handleLoginSend,
      onSuccess: (data) => {
         console.log(data.data)
      },
   })

   return { loginMutate: mutate, isLoading }
}

export default useLoginMutate
