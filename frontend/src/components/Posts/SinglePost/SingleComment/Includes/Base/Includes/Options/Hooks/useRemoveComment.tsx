import { useContext } from 'react'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'

import { useMutation } from '@tanstack/react-query'
import useDeleteImage from '@/hooks/useDeleteImage'

import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
import { CommentContext } from '../../../../../Context/Comment/CommentContext'

const mutationFunction = async ({ commentId, postId }: { commentId: string; postId: string }) => {
   const response = (await axios.delete('/post/post-comment-delete', {
      data: { commentId, postId },
   })) as AxiosResponse<{ commentsLength: number }>
   return response.data
}

const useRemoveComment = () => {
   const { commentsDispatch } = useContext(AllCommentsContext)
   const {
      commentReducer: {
         singleComment: { commentImage },
      },
   } = useContext(CommentContext)
   const { postsDispatch } = useContext(PostContext)
   const deleteImages = useDeleteImage()

   const { mutate } = useMutation({
      mutationKey: ['deleteComment'],
      mutationFn: mutationFunction,
      onSuccess: async (data, { commentId }) => {
         commentsDispatch({ type: 'REMOVE_SINGLE_COMMENT', payload: commentId })
         postsDispatch({ type: 'SET_COMMENTS_LENGTH', payload: data.commentsLength })
         if (commentImage) await deleteImages([commentImage])
      },
   })
   return mutate
}

export default useRemoveComment
