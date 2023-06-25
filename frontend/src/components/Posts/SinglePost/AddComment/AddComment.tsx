import React, { useState, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import type { IPostComment } from '@/types/LikeTypes'

import { PostContext } from '../../../MainPage/Context/PostContextProvider'
import { PostsActions } from '../../../MainPage/Context/PostReducer'

import AddCommentBase from '@/src/components/Base/AddComment/AddCommentBase'

const AddComment: React.FC<{
   reference: React.MutableRefObject<null>
   postId: string
}> = ({ reference, postId }) => {
   const { postsDispatch } = useContext(PostContext)
   const [commentText, setCommentText] = useState<string>('')
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
         postsDispatch({ type: PostsActions.ADD_NEW_COMMENT, payload: data.comments })
      },
   })

   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCommentText(event.target.value)
   }

   const handleSendComment = () => {
      mutate()
      setCommentText('')
   }

   return (
      <>
         <AddCommentBase
            handleSendComment={handleSendComment}
            commentText={commentText}
            handleChangeText={handleChangeText}
            reference={reference}
         />
      </>
   )
}

export default AddComment
