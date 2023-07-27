import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import type { IReactionCount } from '@/src/types/LikeTypes'

const useGetPostLike = (postId: string, isModalOpen: boolean = false) => {
   const { data, isLoading } = useQuery({
      queryKey: ['GetLikeTypes', postId],
      queryFn: async () => {
         return (await axios.post(`/post/get-post-like-count`, { postId })) as AxiosResponse<IReactionCount>
      },
      enabled: isModalOpen,
   })
   return { postLikeCount: data, isLoading }
}

export default useGetPostLike
