import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatId, setSelectedChatWithUserId } from '@/reduxStore/slices/ChatSlice'

import useSetReadMsg from './useSetReadMsg'

const useChangeFunction = () => {
   const messageLabels = useAppSelector((state) => state.chat.messageLabels)
   const dispatch = useAppDispatch()
   const { onMutateFunction } = useSetReadMsg()

   const onChangeFunction = (event: React.SyntheticEvent, newChatId: string) => {
      messageLabels && dispatch(setSelectedChatWithUserId(messageLabels[newChatId].chatWithParticipant._id))
      dispatch(setChatId(newChatId))

      if (messageLabels && messageLabels[newChatId].totalUnreadMsgCount > 0) {
         setTimeout(() => {
            onMutateFunction()
         }, 400)
      }
   }

   return onChangeFunction
}

export default useChangeFunction
