import { AxiosResponse, axiosInstance as axios } from '../../../../../../utils/axiosSetup/AxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { IPost } from '../../../../../Posts/Types'

const useGetPosts = () => {
   const fetchOwnPosts = async () => {
      const data = await axios.get('/post/get-own-post')
      return data as AxiosResponse<IPost[]>
   }

   const { data, isLoading } = useQuery({
      queryKey: ['getPosts'],
      queryFn: fetchOwnPosts,
   })

   return { data, isLoading }
}

export default useGetPosts
