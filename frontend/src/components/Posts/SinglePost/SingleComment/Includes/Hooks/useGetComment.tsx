import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/src/utils/axiosSetup/AxiosInstance'
import type { IReactionCount } from '@/src/types/LikeTypes'

const useGetComment = (commentId: string | null, postId: string, isModalOpen: boolean = false) => {
   const { data } = useQuery({
      queryKey: ['GetCommentLikeTypes', commentId],
      queryFn: async () => {
         return (await axios.post(`/post/get-comment-like-count`, {
            commentId,
            postId,
         })) as AxiosResponse<IReactionCount>
      },
      enabled: isModalOpen,
   })
   return { commentLikeCount: data?.data }
}

export default useGetComment
