import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

const mutationFunction = async ({ commentId, postId }: { commentId: string; postId: string }) => {
   const response = (await axios.delete('/post/post-comment-delete', {
      data: { commentId, postId },
   })) as AxiosResponse
   return response.data
}

const useRemoveComment = () => {
   const { postsDispatch } = useContext(PostContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteComment'],
      mutationFn: mutationFunction,
      onSuccess({}, { commentId }) {
         postsDispatch({ type: 'REMOVE_SINGLE_COMMENT', payload: commentId })
      },
   })
   return mutate
}

export default useRemoveComment
