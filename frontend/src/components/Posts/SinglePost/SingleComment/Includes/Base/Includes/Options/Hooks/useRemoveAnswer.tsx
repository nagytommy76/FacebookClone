import { useContext } from 'react'
import { AnswerContext } from '@/AnswersContext/AnswersContext'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'

const useRemoveAnswer = (postId: string, commentId: string, answerId: string) => {
   const { getAllChildRepliesToDelete } = useContext(AnswerContext)
   const mutationFunction = async () => {
      // getAllChildRepliesToDelete(answerId)
      const response = await axios.delete('/post/post-comment-answer-delete', {
         data: { answerId, postId, commentId },
      })
      console.log(response.data)
      return response.data
   }
   const { mutate } = useMutation({
      mutationKey: ['deleteCommentAnswer'],
      mutationFn: mutationFunction,
   })
   return mutate
}

export default useRemoveAnswer
