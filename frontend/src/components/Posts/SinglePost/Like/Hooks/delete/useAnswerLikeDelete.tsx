import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { AnswerContext } from '@/AnswerContext/AnswerContext'

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
   const { answerDispatch } = useContext(AnswerContext)

   const { mutate } = useMutation({
      mutationKey: ['likeAnswerRemove'],
      mutationFn: deleteCommentLikeFn,
      onSuccess(data, variables) {
         answerDispatch({
            type: 'REMOVE_ANSWER_LIKE',
            payload: { answerId: variables.answerId, likeIdToDelete: variables.likeIdToDelete },
         })
      },
   })

   return { deleteAnswerLikeMutation: mutate }
}

export default useAnswerLikeDelete
