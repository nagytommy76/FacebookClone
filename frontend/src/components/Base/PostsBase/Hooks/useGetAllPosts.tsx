import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import useCheckUrl from '@/hooks/useCheckUrl'
import { IPost } from '@/types/PostTypes'

const useGetAllPosts = (
   setAllPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
   isGetUsersPosts: boolean = false
) => {
   const params = useParams() as { userId: string }
   const isUrlChanged = useCheckUrl()

   const getUserPosts = async () => {
      try {
         const response = await axios.get('/post/get-user-posts', {
            params: { userId: params.userId },
         })
         return response as AxiosResponse<{ allPosts: IPost[] }>
      } catch (error) {
         console.log(error)
         return Promise.reject(new Error())
      }
   }

   const fetchAllQueries = async () => {
      try {
         const response = await axios.get('/post/get-posts')
         return response as AxiosResponse<{ allPosts: IPost[] }>
      } catch (error) {
         console.log(error)
      }
   }

   const { isLoading } = useQuery({
      queryKey: ['getAllPosts', { isUrlChanged, userId: params.userId }],
      queryFn: isGetUsersPosts ? getUserPosts : fetchAllQueries,
      onSuccess(data) {
         if (data) setAllPosts(data.data.allPosts)
      },
   })
   return {
      isLoading,
   }
}

export default useGetAllPosts
