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
         console.log(variables)
      },
   })
   const handleSetInactiveAndClose = (notificationId: string) => {
      // Egy módosítás a DB felé ->
      mutate(notificationId)
      handleClose()
   }

   return { handleSetInactiveAndClose }
}

export default useSetActiveNotifications
