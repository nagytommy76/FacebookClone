import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import type { ICommentAnswers } from '@/src/types/LikeTypes'
import { CommentContext } from '../../Context/CommentContext'
import { CommentActions } from '../../Context/CommentReducer'

const useUpdateCommentMutate = () => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)

   const updateMutateFn = async () => {
      const response = await axios.put('/post/update-comment', { postId, commentId: _id })
   }

   return null
}

export default useUpdateCommentMutate
