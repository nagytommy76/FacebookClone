import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const useGetComment = (commentId: string | null, postId: string) => {
   const { data } = useQuery({
      queryKey: ['GetCommentLikeTypes', 'ONLY_COMMENT_REACTIONS', commentId],
      queryFn: async () => {
         return await axios.post(`/post/get-comment-like-count`, { commentId, postId })
      },
   })
   return { commentLikeCount: data }
}

export default useGetComment
