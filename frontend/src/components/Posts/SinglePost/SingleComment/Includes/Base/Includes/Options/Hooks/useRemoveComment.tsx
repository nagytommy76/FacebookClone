import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

import type { IPostComment } from '@/src/types/LikeTypes'

const mutationFunction = async ({ commentId, postId }: { commentId: string; postId: string }) => {
   const response = (await axios.delete('/post/post-comment-delete', {
      data: { commentId, postId },
   })) as AxiosResponse<{ newComments: IPostComment[] }>
   return response.data
}

const useRemoveComment = () => {
   const { postsDispatch } = useContext(PostContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteComment'],
      mutationFn: mutationFunction,
      onSuccess({ newComments }) {
         postsDispatch({ type: 'REMOVE_SINGLE_COMMENT', payload: newComments })
      },
   })
   return mutate
}

export default useRemoveComment
