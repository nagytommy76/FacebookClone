import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { NotificationsContext } from '../Context/NotificationContextProvider'

const useSetActiveNotifications = (handleClose: () => void) => {
   const { notificationsDispatch } = useContext(NotificationsContext)

   const mutationFn = async (notificationId: string) => {
      return await axios.patch('/user/set-active', { notificationId })
   }

   const { mutate } = useMutation({
      mutationKey: ['setActiveNotifications'],
      mutationFn,
      onSuccess(data, variables, context) {
         notificationsDispatch({ type: 'UPDATE_ISREAD_BYID', payload: variables })
      },
   })
   const handleSetInactiveAndClose = (notificationId: string, read: boolean) => {
      // Egy módosítás a DB felé ->
      if (!read) mutate(notificationId)
      handleClose()
   }

   return { handleSetInactiveAndClose }
}

export default useSetActiveNotifications
