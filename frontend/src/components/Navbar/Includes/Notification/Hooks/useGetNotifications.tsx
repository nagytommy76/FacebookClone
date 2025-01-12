import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useAppSelector } from '@/reduxStore/store'

import type { NotificationType } from '../Types'
import type { INotificationsAction } from '../Context/NotificationReducer'

const useGetNotifications = (notificationsDispatch: React.Dispatch<INotificationsAction>) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const queryFunction = async () => {
      const data = (await axios.get('/user/notifications')) as AxiosResponse<{
         notifications: NotificationType[]
      }>
      return data
   }
   const { data } = useQuery({
      queryKey: ['notifications', userId],
      queryFn: queryFunction,
   })

   useEffect(() => {
      if (data) {
         notificationsDispatch({ type: 'SET_ALL_NOTIFICATIONS', payload: data.data.notifications })
         notificationsDispatch({ type: 'SET_ACTIVE_NOTIFICATIONS_COUNT', payload: data.data.notifications })
      }
   }, [data, notificationsDispatch])
}

export default useGetNotifications
