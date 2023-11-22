import { AxiosResponse, axiosInstance as axios } from '@/axios/AxiosInstance'
import useUploadFirebase from '@/hooks/useUploadFirebase'
import type { IPostComment } from '@/src/types/LikeTypes'

const useCommentMutation = (commentImagePath: FileList | null, commentText: string, postID: string) => {
   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const commentMutationFn = async () => {
      let imageUrl: string | null = null
      if (commentImagePath) {
         imageUrl = await handleSingleImageUploadToFirebase(commentImagePath[0], postID, true)
      }
      const response = (await axios.post('/post/post-comment-add', {
         answeredAt: new Date(),
         comment: commentText,
         commentImage: imageUrl,
         postId: postID,
      })) as AxiosResponse<{ comments: IPostComment[] }>
      return response.data
   }
   return commentMutationFn
}

export default useCommentMutation
