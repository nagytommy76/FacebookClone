import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import { AllCommentsContext } from '@/src/components/Posts/Context/AllCommentsContext'

import type { IPostComment } from '@/src/types/LikeTypes'

const useGetComments = (postId: string, isDialogOpen: boolean) => {
   const { commentsDispatch } = useContext(AllCommentsContext)

   const queryFunction = async () => {
      const result = (await axios.get('/post/get-post-comments', { params: { postId } })) as AxiosResponse<{
         comments: IPostComment[]
      }>
      return result
   }

   const { isLoading } = useQuery({
      queryKey: ['getPostComments', { postId, isDialogOpen }],
      queryFn: queryFunction,
      enabled: isDialogOpen,
      onSuccess(data) {
         commentsDispatch({ type: 'SET_COMMENTS', payload: data.data.comments })
      },
      onError(err) {
         console.log(err)
      },
   })
   return isLoading
}

export default useGetComments
