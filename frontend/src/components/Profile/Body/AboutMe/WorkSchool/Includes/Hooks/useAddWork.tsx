import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse, AxiosError } from '@/axios/AxiosInstance'
import type { DateError, Error } from '../SelectDate/Types'
import type { ErrorResponse } from '@/types/AuthTypes'

const useAddWork = (
   company: Error,
   post: Error,
   city: Error,
   fromDate: DateError,
   toDate: DateError,
   endDateChecked: boolean,
   setToDefault: () => void,
   handleChangeErrors: (errorResponseArray: ErrorResponse) => void
) => {
   const workMutationFn = async () => {
      return await axios.post('/user/save-workplace', {
         company: company.value,
         post: post.value,
         city: city.value,
         endDateChecked,
         fromDate: fromDate.value,
         toDate: toDate.value,
      })
   }

   const { mutate, isError, error } = useMutation({
      mutationKey: ['addNewWorkplace'],
      mutationFn: workMutationFn,
      onSuccess(data, variables, context) {
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
