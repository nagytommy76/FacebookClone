import { useContext } from 'react'
import { AxiosResponse, axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AnswerContext } from '@/AnswerContext/AnswerContext'
import type { IPostLike } from '@/src/types/LikeTypes'

interface IAnswerLike {
   commentId: string
   postId: string
   commentAnswerId?: string
   reactionType: string
}

interface IAnswerLikeResponse {
   commentAnswersIndex: number
   updatedCommentAnswerLikes: IPostLike[]
}
const handleSendAnswerLike = async ({ commentId, postId, commentAnswerId, reactionType }: IAnswerLike) => {
   try {
      const response = (await axios.post('post/comment-answer-like', {
         commentId,
         postId,
         commentAnswerId,
         reactionType,
      })) as AxiosResponse<IAnswerLikeResponse>
      return response
   } catch (error) {
      console.log(error)
   }
}

const useLikeAnswer = () => {
   const { answerDispatch } = useContext(AnswerContext)

   const { mutate } = useMutation({
      mutationKey: ['likeCommentAnswer'],
      mutationFn: handleSendAnswerLike,
      onSuccess(data) {
         if (data?.status === 200)
            answerDispatch({
               type: 'ADD_ANSWER_LIKE',
               payload: {
                  commentAnswersIndex: data.data.commentAnswersIndex,
                  updatedCommentAnswerLikes: data.data.updatedCommentAnswerLikes,
               },
            })
      },
   })
   return { mutateAnswerLike: mutate }
}

export default useLikeAnswer
