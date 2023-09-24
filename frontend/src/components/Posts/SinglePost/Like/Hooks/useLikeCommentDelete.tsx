import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { CommentContext } from '@/CommentContext/CommentContext'
interface ICommentLikeDelete {
   postId: string
   likeIdToDelete: string
   commentId?: string
}

const deleteCommentLikeFn = async ({ postId, commentId, likeIdToDelete }: ICommentLikeDelete) => {
   return await axios.delete('/post/post-comment-like-delete', {
      data: { postId, commentId, likeIdToDelete },
   })
}

const useLikeCommentDelete = () => {
   const { commentDispatch } = useContext(CommentContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteCommentLikeFn,
      onSuccess(data, variables) {
         if (data.status === 200)
            commentDispatch({ type: 'REMOVE_SINGLE_COMMENT_LIKE', payload: variables.likeIdToDelete })
      },
   })
   return { deleteCommentLikeMutation: mutate }
}

export default useLikeCommentDelete
