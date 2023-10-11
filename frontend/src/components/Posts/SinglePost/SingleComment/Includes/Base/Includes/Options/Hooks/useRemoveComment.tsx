import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'
import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'

const mutationFunction = async ({ commentId, postId }: { commentId: string; postId: string }) => {
   const response = (await axios.delete('/post/post-comment-delete', {
      data: { commentId, postId },
   })) as AxiosResponse
   return response.data
}

const useRemoveComment = () => {
   const { commentsDispatch } = useContext(AllCommentsContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteComment'],
      mutationFn: mutationFunction,
      onSuccess({}, { commentId }) {
         commentsDispatch({ type: 'REMOVE_SINGLE_COMMENT', payload: commentId })
      },
   })
   return mutate
}

export default useRemoveComment
