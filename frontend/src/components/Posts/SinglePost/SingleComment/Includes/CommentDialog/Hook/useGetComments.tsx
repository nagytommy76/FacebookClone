import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import type { IPostComment } from '@/src/types/LikeTypes'

const useGetComments = (
   setComments: React.Dispatch<React.SetStateAction<IPostComment[]>>,
   postId: string,
   isDialogOpen: boolean
) => {
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
         setComments(data.data.comments)
      },
      onError(err) {
         console.log(err)
      },
   })
   return isLoading
}

export default useGetComments
