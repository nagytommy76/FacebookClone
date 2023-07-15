import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import type { IPost } from '@/types/PostTypes'

const getUserPosts = async () => {
   try {
      const response = (await axios.get('/post/get-user-posts')) as AxiosResponse<IPost[]>
      return response.data
   } catch (error) {
      console.log(error)
      return Promise.reject(new Error())
   }
}

const useGetUserPosts = () => {
   const { data, isLoading, isError } = useQuery({
      queryKey: ['userPosts'],
      queryFn: getUserPosts,
   })
   return { userPosts: data, isLoading, isError }
}

export default useGetUserPosts
