import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'
import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

const mutationFunction = async ({ commentId, postId }: { commentId: string; postId: string }) => {
   const response = (await axios.delete('/post/post-comment-delete', {
      data: { commentId, postId },
   })) as AxiosResponse<{ commentsLength: number }>
   return response.data
}

const useRemoveComment = () => {
   const { commentsDispatch } = useContext(AllCommentsContext)
   const { postsDispatch } = useContext(PostContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteComment'],
      mutationFn: mutationFunction,
      onSuccess(data, { commentId }) {
         commentsDispatch({ type: 'REMOVE_SINGLE_COMMENT', payload: commentId })
         postsDispatch({ type: 'SET_COMMENTS_LENGTH', payload: data.commentsLength })
      },
   })
   return mutate
}

export default useRemoveComment
