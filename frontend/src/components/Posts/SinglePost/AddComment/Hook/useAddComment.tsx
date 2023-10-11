import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import { IPostComment } from '@/src/types/LikeTypes'
import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'

const useAddComment = (postId: string) => {
   const { commentsDispatch } = useContext(AllCommentsContext)
   const [commentText, setCommentText] = useState<string>('')
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)
   const { mutate } = useMutation({
      mutationKey: ['sendPostComment'],
      mutationFn: async () => {
         const response = (await axios.post('/post/post-comment-add', {
            answeredAt: new Date(),
            comment: commentText,
            postId,
         })) as AxiosResponse<{ comments: IPostComment[] }>
         return response.data
      },
      onSuccess: (data) => {
         commentsDispatch({ type: 'ADD_NEW_COMMENT', payload: data.comments })
      },
   })

   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setCommentText(event.target.value)
   }

   const handleChangeTextWithEmoji = (emoji: string = '') => {
      if (commentText.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setCommentText(`${commentText}${emoji}`)
   }

   const handleSendComment = () => {
      mutate()
      setCommentText('')
   }

   return { handleChangeText, handleSendComment, handleChangeTextWithEmoji, commentText, isSendDisabled }
}

export default useAddComment
