import { useContext } from 'react'
import { CommentContext } from '@/CommentContext/CommentContext'

import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'
import type { IReactionCount } from '@/src/types/LikeTypes'

const useGetComment = (
   answerId: string,
   commentId: string | undefined,
   postId: string,
   isModalOpen: boolean = false,
   isChildComment: boolean = false
) => {
   const {
      commentReducer: {
         singleComment: { _id },
      },
   } = useContext(CommentContext)

   const getCommentLikesFn = async () => {
      return (await axios.post(`/post/get-comment-like-count`, {
         commentId: answerId,
         postId,
      })) as AxiosResponse<IReactionCount>
   }

   const getAnswerLikesFn = async () => {
      return (await axios.post(`/post/get-answer-like-count`, {
         commentId: _id,
         answerId,
         postId,
      })) as AxiosResponse<IReactionCount>
   }

   const { data } = useQuery({
      queryKey: ['GetCommentLikeTypes', commentId],
      queryFn: isChildComment ? getAnswerLikesFn : getCommentLikesFn,
      enabled: isModalOpen,
   })
   return { commentLikeCount: data?.data }
}

export default useGetComment
