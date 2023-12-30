import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { NotificationType } from '../Types'
import type { INotificationsAction } from '../Context/NotificationReducer'

const useGetNotifications = (notificationsDispatch: React.Dispatch<INotificationsAction>) => {
   const queryFunction = async () => {
      const data = (await axios.get('/user/notifications')) as AxiosResponse<{
         notifications: NotificationType[]
      }>
      return data
   }
   const {} = useQuery({
      queryKey: ['notifications'],
      queryFn: queryFunction,
      onSuccess: (data) => {
         notificationsDispatch({ type: 'SET_ALL_NOTIFICATIONS', payload: data.data.notifications })
         notificationsDispatch({ type: 'SET_ACTIVE_NOTIFICATIONS_COUNT', payload: data.data.notifications })
      },
   })

   return null
}

export default useGetNotifications
