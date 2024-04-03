import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import {
   setChatModalOpen,
   setTabValue,
   setMessageLabels,
   addSingleMessage,
} from '@/reduxStore/slices/ChatSlice'

const useChatModal = () => {
   const dispatch = useAppDispatch()
   const { messageLabels } = useAppSelector((state) => state.chat)

   const hadleOpenChatModal = (userId: string, fullName: string, selectedProfilePicturePath: string) => {
      if (messageLabels) {
         if (!messageLabels.find((label) => label._id == userId)) {
            dispatch(
               addSingleMessage({
                  _id: userId,
                  captionText: '',
                  fullName: fullName,
                  selectedProfilePicturePath: selectedProfilePicturePath,
               })
            )
         }
         dispatch(setTabValue(userId))
      } else {
         dispatch(
            setMessageLabels([
               {
                  _id: userId,
                  captionText: '',
                  fullName: fullName,
                  selectedProfilePicturePath: selectedProfilePicturePath,
               },
            ])
         )
         dispatch(setTabValue(userId))
      }
      dispatch(setChatModalOpen(true))
   }

   return hadleOpenChatModal
}

export default useChatModal
