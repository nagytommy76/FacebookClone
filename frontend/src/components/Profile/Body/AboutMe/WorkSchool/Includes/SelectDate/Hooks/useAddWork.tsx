import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse, AxiosError } from '@/axios/AxiosInstance'
import type { Error } from '../Types'

const useAddWork = (
   company: Error,
   post: Error,
   city: Error,
   fromDate: Date | undefined,
   toDate: Date | undefined,
   endDateChecked: boolean,
   setToDefault: () => void
) => {
   const workMutationFn = async () => {
      return await axios.post('/user/save-workplace', {
         company: company.value,
         post: post.value,
         city: city.value,
         endDateChecked,
         fromDate,
         toDate,
      })
   }

   const { mutate, isError, error } = useMutation({
      mutationKey: ['addNewWorkplace'],
      mutationFn: workMutationFn,
      onSuccess(data, variables, context) {
         console.log(data)
         //  setToDefault()
      },
      onError(error, variables, context) {
         console.log(error)
      },
   })

   return mutate
}

export default useAddWork
