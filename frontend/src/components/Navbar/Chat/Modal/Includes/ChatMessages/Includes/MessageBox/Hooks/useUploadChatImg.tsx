import { useAppSelector } from '@/reduxStore/store'

import useUploadFirebase from '@/hooks/useUploadFirebase'

const useUploadChatImg = (handleAddChatMutate: (chatImagePath?: string) => void) => {
   const { handleChatImgUpload } = useUploadFirebase()
   const chatId = useAppSelector((state) => state.chat.chatId)

   const handleUploadChatMsgImg = async (singleImageFile: FileList | null) => {
      if (chatId && singleImageFile) {
         const uploadedImagePath = await handleChatImgUpload(chatId, singleImageFile[0])
         return uploadedImagePath
      }
   }

   /**
    * @param event React.ChangeEvent<HTMLInputElement> Image
    */
   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedImagePath = await handleUploadChatMsgImg(event.target.files)
      if (uploadedImagePath) handleAddChatMutate(uploadedImagePath)
   }

   return handleUpload
}

export default useUploadChatImg
