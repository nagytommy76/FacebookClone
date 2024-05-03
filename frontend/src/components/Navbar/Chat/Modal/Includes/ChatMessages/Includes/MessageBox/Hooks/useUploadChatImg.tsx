import { useEffect } from 'react'
import { useAppSelector } from '@/reduxStore/store'

import useUploadFirebase from '@/hooks/useUploadFirebase'

const useUploadChatImg = (
   chatImagePath: FileList | null,
   handleAddChatMutate: (chatImagePath?: string) => void
) => {
   const { handleChatImgUpload } = useUploadFirebase()
   const chatId = useAppSelector((state) => state.chat.chatId)

   useEffect(() => {
      const handleUploadChatMsgImg = async () => {
         if (chatImagePath && chatId) {
            const uploadedImagePath = await handleChatImgUpload(chatId, chatImagePath[0])
            return uploadedImagePath
         }
      }
      handleUploadChatMsgImg().then((uploadedImagePath) => {
         if (uploadedImagePath) handleAddChatMutate(uploadedImagePath)
      })
   }, [chatImagePath, chatId, handleChatImgUpload, handleAddChatMutate])

   return null
}

export default useUploadChatImg
