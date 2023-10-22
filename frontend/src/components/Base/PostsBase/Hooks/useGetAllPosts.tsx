import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import { IPost } from '@/types/PostTypes'

const fetchAllQueries = async () => {
   try {
      const response = await axios.get('/post/get-posts')
      return response as AxiosResponse<{ allPosts: IPost[] }>
   } catch (error) {
      console.log(error)
   }
}

const useGetAllPosts = (setAllPosts: React.Dispatch<React.SetStateAction<IPost[]>>) => {
   const { isLoading } = useQuery({
      queryKey: ['getAllPosts'],
      queryFn: fetchAllQueries,
      onSuccess(data) {
         if (data) setAllPosts(data.data.allPosts)
      },
   })
   return {
      isLoading,
   }
}

export default useGetAllPosts
