import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import {
   setChatModalOpen,
   setTabValue,
   setMessageLabels,
   addSingleMessageLabel,
} from '@/reduxStore/slices/ChatSlice'

const useChatModal = () => {
   const dispatch = useAppDispatch()
   const { messageLabels } = useAppSelector((state) => state.chat)

   const hadleOpenChatModal = (userId: string, fullName: string, selectedProfilePicturePath: string) => {
      if (messageLabels) {
         if (!messageLabels.find((label) => label._id == userId)) {
            dispatch(
               addSingleMessageLabel({
                  _id: userId,
                  captionText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
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
