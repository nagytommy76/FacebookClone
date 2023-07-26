import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const useGetPostLike = (postId: string) => {
   const { data } = useQuery({
      queryKey: ['GetLikeTypes', postId],
      queryFn: async () => {
         return await axios.post(`/post/get-post-like-count`, { postId })
      },
   })
   return { postLikeCount: data }
}

export default useGetPostLike
