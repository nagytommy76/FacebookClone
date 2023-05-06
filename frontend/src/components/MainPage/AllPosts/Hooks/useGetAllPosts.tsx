import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '../../../../utils/axiosSetup/AxiosInstance'
import { IPost } from '../../../Posts/Types'

const fetchAllQueries = async () => {
   try {
      const response = await axios.get('/post/get-posts')
      return response as AxiosResponse<{ allPosts: IPost[] }>
   } catch (error) {
      console.log(error)
   }
}

const useGetAllPosts = () => {
   const { data, isLoading } = useQuery({ queryKey: ['todos'], queryFn: fetchAllQueries })
   return {
      isLoading,
      allPosts: data?.data.allPosts,
   }
}

export default useGetAllPosts
