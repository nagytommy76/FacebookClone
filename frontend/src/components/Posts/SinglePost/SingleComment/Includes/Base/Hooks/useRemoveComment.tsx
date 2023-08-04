import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const mutationFunction = async ({
   commentId,
   postId,
   isChildComment,
}: {
   commentId: string
   postId: string
   isChildComment: boolean
}) => {
   const response = await axios.delete('/post/post-comment-delete', {
      data: { commentId, postId, isChildComment },
   })
   return response.data
}

const useRemoveComment = () => {
   const { mutate } = useMutation({
      mutationKey: ['deleteComment'],
      mutationFn: mutationFunction,
   })
   return mutate
}

export default useRemoveComment
