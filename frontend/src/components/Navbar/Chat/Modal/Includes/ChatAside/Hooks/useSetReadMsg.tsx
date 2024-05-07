import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { setTotalUnreadMsgCount } from '@/reduxStore/slices/ChatSlice'

const useSetReadMsg = () => {
   const dispatch = useAppDispatch()
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const currentChatId = useAppSelector((state) => state.chat.chatId)

   const setMessageIsRead = async () => {
      return (await axios.put(`/chat/set-read-messages`, { currentChatId })) as AxiosResponse<{
         totalUnreadMsgCount: number
      }>
   }

   const { mutate } = useMutation({
      mutationKey: ['setUnreadMessages', messageLabels],
      mutationFn: setMessageIsRead,
      onSuccess(data, variables, context) {
         if (currentChatId) {
            dispatch(setTotalUnreadMsgCount({ currentChatId, count: data.data.totalUnreadMsgCount }))
         }
      },
   })

   return { onMutateFunction: () => mutate() }
}

export default useSetReadMsg
