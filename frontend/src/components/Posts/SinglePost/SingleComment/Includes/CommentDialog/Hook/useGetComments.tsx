import { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import type { IPostComment } from '@/src/types/LikeTypes'

const useGetComments = (postId: string, isDialogOpen: boolean) => {
   const { postsDispatch } = useContext(PostContext)

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
         postsDispatch({ type: 'SET_COMMENTS', payload: data.data.comments })
      },
      onError(err) {
         console.log(err)
      },
   })
   return isLoading
}

export default useGetComments
