import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import { IPost } from '@/types/PostTypes'

const getUserPosts = async () => {
   try {
      const response = await axios.get('/post/get-user-posts')
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

const useGetAllPosts = (
   setAllPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
   isGetUsersPosts: boolean = false,
   isUrlChanged: boolean = false
) => {
   const { isLoading } = useQuery({
      queryKey: ['getAllPosts', isUrlChanged],
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
