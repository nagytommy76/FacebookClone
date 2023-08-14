import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import { CommentContext } from '../../Context/CommentContext'
import { CommentActions } from '../../Context/CommentReducer'

const useUpdateAnswer = (modifiedText: string, setStatesToDefault: () => void) => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)

   const updateAnswerMutateFn = async () => {
      const response = (await axios.put('/post/update-post-comment-answer', {
         postId,
         commentId: _id,
         modifiedText,
      })) as AxiosResponse<{ modifiedComment: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateCommentAnswer'],
      mutationFn: updateAnswerMutateFn,
      onSuccess(data) {
         console.log(data)
      },
   })

   return mutate
}

export default useUpdateAnswer
