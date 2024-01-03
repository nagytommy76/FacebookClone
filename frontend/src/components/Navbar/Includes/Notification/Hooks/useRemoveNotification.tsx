import { useContext } from 'react'
import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

import { NotificationsContext } from '../Context/NotificationContextProvider'

const useRemoveNotification = (notificationId: string) => {
   const { notificationsDispatch } = useContext(NotificationsContext)
   const removeNotMutation = async () => {
      return await axios.delete('/user/notification', { data: { notificationId } })
   }

   const { mutate } = useMutation({
      mutationKey: ['removeNotification'],
      mutationFn: removeNotMutation,
      onSuccess() {
         notificationsDispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId })
      },
   })

   return mutate
}

export default useRemoveNotification
