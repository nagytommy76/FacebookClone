import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { Error } from '../Types'

const useAddWork = (
   company: Error,
   post: Error,
   city: Error,
   fromDate: Date | undefined,
   toDate: Date | undefined,
   setToDefault: () => void
) => {
   const workMutationFn = async () => {
      return await axios.post('/user/save-workplace', {
         company: company.value,
         post: post.value,
         city: city.value,
         fromDate,
         toDate,
      })
   }

   const { mutate } = useMutation({
      mutationKey: ['addNewWorkplace'],
      mutationFn: workMutationFn,
      onSuccess(data, variables, context) {
         console.log(data.data)
         //  setToDefault()
      },
   })

   return mutate
}

export default useAddWork
