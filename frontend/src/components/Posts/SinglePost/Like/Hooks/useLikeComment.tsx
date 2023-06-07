import { useContext } from 'react'
import { CommentContext } from '../../SingleComment/Context/CommentContext'
import { AxiosResponse, axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { IPostLike, LikeTypes } from '../Types'

interface ICommentLike {
   likeTypeFomInput: LikeTypes
   postId: string
   commentId?: string
}
// Ide kéne egy context-et behívni, (kommentek context), mert ezt a hook-ot csak akkor hívom meg ha !isPostLike
const useLikeComment = () => {
   const {
      commentReducer: { singleComment },
   } = useContext(CommentContext)
   const handleSendLike = async ({ likeTypeFomInput, postId, commentId }: ICommentLike) => {
      try {
         const response = (await axios.post('/post/post-comment-like', {
            reactionType: likeTypeFomInput,
            postId,
            commentId,
         })) as AxiosResponse<IPostLike[]>
         // setComment(response.data)
         console.log(response.data)

         return response
      } catch (error) {
         console.log(error)
      }
   }

   const { mutate } = useMutation({
      mutationKey: ['likeComment'],
      mutationFn: handleSendLike,
   })
   return { mutateCommentLike: mutate }
}

export default useLikeComment
