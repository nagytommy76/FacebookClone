import { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { NotificationType } from '../Types'

const useGetNotifications = (setNotifications: Dispatch<SetStateAction<NotificationType[] | null>>) => {
   const queryFunction = async () => {
      const data = (await axios.get('/user/notifications')) as AxiosResponse<{
         notifications: NotificationType[]
      }>
      console.log(data.data)
      return data
   }
   const {} = useQuery({
      queryKey: ['notifications'],
      queryFn: queryFunction,
      onSuccess: (data) => {
         setNotifications(data.data.notifications)
      },
   })

   return null
}

export default useGetNotifications
