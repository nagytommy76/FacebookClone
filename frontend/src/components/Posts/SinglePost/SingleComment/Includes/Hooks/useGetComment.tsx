import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const useGetComment = (commentId: string | null, postId: string, isModalOpen: boolean = false) => {
   const { data } = useQuery({
      queryKey: ['GetCommentLikeTypes', commentId],
      queryFn: async () => {
         return await axios.post(`/post/get-comment-like-count`, { commentId, postId })
      },
      enabled: isModalOpen,
   })
   return { commentLikeCount: data }
}

export default useGetComment
