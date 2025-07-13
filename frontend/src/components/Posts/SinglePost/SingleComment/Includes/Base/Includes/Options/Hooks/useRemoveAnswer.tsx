import { useContext } from 'react'
import { AnswerContext } from '@/AnswersContext/AnswersContext'
import { useAppDispatch } from '@/reduxStore/store'
import { setHeadText, setIsInfoSnackOpen, setMessage } from '@/reduxStore/slices/InfoSnack'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'

const useRemoveAnswer = (postId: string, commentId: string, answerId: string) => {
   const { answerDispatch } = useContext(AnswerContext)
   const dispatch = useAppDispatch()

   const mutationFunction = async () => {
      const response = await axios.delete('/post/post-comment-answer-delete', {
         data: { answerId, postId, commentId },
      })
      return response.data
   }
   const { mutate } = useMutation({
      mutationKey: ['deleteCommentAnswer'],
      mutationFn: mutationFunction,
      onSuccess() {
         dispatch(setIsInfoSnackOpen(true))
         dispatch(setHeadText('Komment törlése sikeres'))
         dispatch(setMessage('Sikeresen törölted a kommentet!'))
         answerDispatch({ type: 'SET_ANSWER_DELETED', payload: answerId })
      },
   })
   return mutate
}

export default useRemoveAnswer
