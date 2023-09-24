import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'

import { CommentContext } from '@/CommentContext/CommentContext'

interface IAnswerLikeDelete {
   postId: string
   commentId: string
   answerId: string
   likeIdToDelete: string
}

const deleteCommentLikeFn = async ({ postId, commentId, answerId, likeIdToDelete }: IAnswerLikeDelete) => {
   return await axios.delete('/post/post-answer-like-delete', {
      data: { postId, commentId, answerId, likeIdToDelete },
   })
}

const useAnswerLikeDelete = () => {
   const { commentDispatch } = useContext(CommentContext)

   const { mutate } = useMutation({
      mutationKey: ['likeAnswerRemove'],
      mutationFn: deleteCommentLikeFn,
      onSuccess(data, variables) {
         console.log(variables)
         commentDispatch({
            type: 'REMOVE_ANSWER_LIKE',
            payload: { answerId: variables.answerId, likeIdToDelete: variables.likeIdToDelete },
         })
      },
   })

   return { deleteAnswerLikeMutation: mutate }
}

export default useAnswerLikeDelete
