import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import { CommentContext } from '../../Context/CommentContext'
import { CommentActions } from '../../Context/CommentReducer'

const useUpdateCommentMutate = (modifiedText: string, setStatesToDefault: () => void) => {
   const {
      commentDispatch,
      commentReducer: {
         postId,
         singleComment: { _id },
      },
   } = useContext(CommentContext)

   const updateMutateFn = async () => {
      const response = (await axios.put('/post/update-post-comment', {
         postId,
         commentId: _id,
         modifiedText,
      })) as AxiosResponse<{ modifiedComment: string }>
      return response.data
   }

   const { mutate } = useMutation({
      mutationKey: ['updateComment'],
      mutationFn: updateMutateFn,
      onSuccess(data) {
         commentDispatch({ payload: modifiedText, type: CommentActions.UPDATE_COMMENT_TEXT })
         setStatesToDefault()
      },
   })

   const updateCommentMutate = () => mutate()

   return updateCommentMutate
}

export default useUpdateCommentMutate
