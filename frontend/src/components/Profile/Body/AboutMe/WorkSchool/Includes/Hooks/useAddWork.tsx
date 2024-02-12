import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse, AxiosError } from '@/axios/AxiosInstance'
import { useParams } from 'next/navigation'
import { ProfileContext } from '@/ProfileContext/ProfileContextProvider'

import type { DateError, Error } from '../SelectDate/Types'
import type { ErrorResponse } from '@/types/AuthTypes'

const useAddWork = (
   company: Error,
   post: Error,
   city: Error,
   description: string,
   fromDate: DateError,
   toDate: DateError,
   endDateChecked: boolean,
   setToDefault: () => void,
   handleChangeErrors: (errorResponseArray: ErrorResponse) => void
) => {
   const { profileDispatch } = useContext(ProfileContext)
   const params = useParams() as { userId: string }

   const workMutationFn = async () => {
      return await axios.post(
         '/user/save-workplace',
         {
            company: company.value,
            post: post.value,
            city: city.value,
            description,
            endDateChecked,
            fromDate: fromDate.value,
            toDate: toDate.value,
         },
         {
            params: {
               userToModify: params.userId,
            },
         }
      )
   }

   const { mutate, isError, error } = useMutation({
      mutationKey: ['addNewWorkplace'],
      mutationFn: workMutationFn,
      onSuccess(data, variables, context) {
         profileDispatch({
            type: 'ADD_WORKPLACE',
            payload: data.data.savedUserWorlplace,
         })
         setToDefault()
         console.log(data)
      },
      onError(error: AxiosError<{ errors: ErrorResponse }>) {
         if (error.response) handleChangeErrors(error.response.data.errors)
      },
   })

   return mutate
}

export default useAddWork
