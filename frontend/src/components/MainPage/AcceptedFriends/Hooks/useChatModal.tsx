import { useAppDispatch } from '@/reduxStore/store'
import { setChatModalOpen, setChatWithUserId, setMessageLabels } from '@/reduxStore/slices/ChatSlice'

const useChatModal = () => {
   const dispatch = useAppDispatch()

   const hadleOpenChatModal = (userId: string, fullName: string, selectedProfilePicturePath: string) => {
      dispatch(
         setMessageLabels({
            _id: userId,
            captionText: '',
            fullName: fullName,
            selectedProfilePicturePath: selectedProfilePicturePath,
         })
      )
      dispatch(setChatWithUserId(userId))
      dispatch(setChatModalOpen(true))
   }

   return hadleOpenChatModal
}

export default useChatModal
