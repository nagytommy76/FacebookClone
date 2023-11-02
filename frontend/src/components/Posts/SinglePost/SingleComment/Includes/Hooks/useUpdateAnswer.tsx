import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import { CommentContext } from '../../Context/CommentContext'

const useUpdateAnswer = (modifiedText: string, setStatesToDefault: () => void) => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)

   const updateAnswerMutateFn = async (answerId: string) => {
      const response = (await axios.put('/post/edit/update-post-comment-answer', {
         postId,
         commentId: _id,
         modifiedText,
         commentAnswerId: answerId,
      })) as AxiosResponse<{ modifiedComment: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateCommentAnswer'],
      mutationFn: updateAnswerMutateFn,
      onSuccess(data, variables) {
         commentDispatch({
            type: 'UPDATE_SINGLE_COMMENT_ANSWER',
            payload: { modifiedText, answerID: variables },
         })
         setStatesToDefault()
      },
   })

   return mutate
}

export default useUpdateAnswer
