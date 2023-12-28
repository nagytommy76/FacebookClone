import { Dispatch, SetStateAction, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { NotificationType } from '../Types'

const useGetNotifications = (setNotifications: Dispatch<SetStateAction<NotificationType[] | null>>) => {
   const [activeNotifications, setActiveNotifications] = useState<number>(0)

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
         data.data.notifications.map((notification) => {
            if (!notification.isRead) {
               setActiveNotifications((prev) => (prev += 1))
            }
         })
      },
   })

   return activeNotifications
}

export default useGetNotifications
