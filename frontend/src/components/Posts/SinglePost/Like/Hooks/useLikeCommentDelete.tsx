import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import { CommentContext } from '@/CommentContext/CommentContext'
import { IPostLike } from '@/src/types/LikeTypes'
interface ICommentLikeDelete {
   postId: string
   commentId?: string
}

const deleteCommentLikeFn = async ({ postId, commentId }: ICommentLikeDelete) => {
   return (await axios.delete('/post/post-comment-like-delete', {
      data: { postId, commentId },
   })) as AxiosResponse<{ likes: IPostLike[]; removedUserLikesID: string }>
}

const useLikeCommentDelete = () => {
   const { commentDispatch } = useContext(CommentContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteCommentLikeFn,
      onSuccess(data) {
         if (data.status === 200)
            commentDispatch({ type: 'REMOVE_SINGLE_COMMENT_LIKE', payload: data.data.removedUserLikesID })
      },
   })
   return { deleteCommentLikeMutation: mutate }
}

export default useLikeCommentDelete
