import React from 'react'
import { axiosInstance as axios } from '../../../../src/utils/axiosSetup/AxiosInstance'
import type { AxiosResponse } from 'axios'
import type { ILoginData } from '../../Register/Includes/Types'

const useMutationFn = (email: string, password: string) => {
   const handleLoginSend = async (event: React.FormEvent): Promise<AxiosResponse<ILoginData>> => {
      event.preventDefault()
      return await axios.post('/auth/login', {
         email,
         password,
      })
   }
   return handleLoginSend
}

export default useMutationFn
