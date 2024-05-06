import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'

import { useAppSelector } from '@/reduxStore/store'

const useSetReadMsg = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const currentChatId = useAppSelector((state) => state.chat.chatId)
   const loggedInUserId = useAppSelector((state) => state.auth.userId)

   const setMessageIsRead = async () => {
      return await axios.put(`/chat/set-read-messages`, { currentChatId })
   }

   const { mutate } = useMutation({
      mutationKey: ['setUnreadMessages', messageLabels],
      mutationFn: setMessageIsRead,
      onSuccess(data, variables, context) {
         console.log(data.data)
      },
   })

   return { onMutateFunction: () => mutate() }
}

export default useSetReadMsg
