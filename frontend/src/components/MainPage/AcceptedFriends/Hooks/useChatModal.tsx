import { useAppDispatch } from '@/reduxStore/store'
import {
   setChatModalOpen,
   setChatWithUserId,
   setMessageLabels,
   setChatId,
} from '@/reduxStore/slices/ChatSlice'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

const useChatModal = () => {
   const dispatch = useAppDispatch()

   const mutationFunction = async ({
      userId,
      fullName,
      selectedProfilePicturePath,
   }: {
      userId: string
      fullName: string
      selectedProfilePicturePath: string
   }) => {
      return await axios.post('/chat/create-chat', { chatUserId: userId })
   }

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

   const { mutate } = useMutation({
      mutationKey: ['createNewChat'],
      mutationFn: mutationFunction,
      onSuccess(data, variables, context) {
         console.log(data.data)
         const { fullName, selectedProfilePicturePath, userId } = variables
         hadleOpenChatModal(userId, fullName, selectedProfilePicturePath)
         dispatch(setChatId(data.data.createdChatModel._id))
      },
   })

   return mutate
}

export default useChatModal
