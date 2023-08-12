import React, { useState, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import type { IPostComment } from '@/types/LikeTypes'

import { PostContext } from '../../../MainPage/Context/PostContextProvider'

import AddCommentBase from '../SingleComment/Includes/Base/AddComment/AddCommentBase'

const AddComment: React.FC<{
   reference: React.MutableRefObject<null>
   postId: string
}> = ({ reference, postId }) => {
   const { postsDispatch } = useContext(PostContext)
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
         postsDispatch({ type: 'ADD_NEW_COMMENT', payload: data.comments })
      },
   })

   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setCommentText(event.target.value)
   }

   const handleSendComment = () => {
      mutate()
      setCommentText('')
   }

   return (
      <>
         <AddCommentBase
            updateCommentMutate={() => {}}
            isUpdate={false}
            handleSendComment={handleSendComment}
            commentText={commentText}
            handleChangeText={handleChangeText}
            reference={reference}
            isSendDisabled={isSendDisabled}
         />
      </>
   )
}

export default AddComment
