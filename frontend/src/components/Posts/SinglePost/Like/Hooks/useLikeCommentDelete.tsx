import { useContext } from 'react'
import { PostContext } from '../../../../MainPage/Context/PostContextProvider'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
interface ICommentLikeDelete {
   postId: string
   commentId?: string
}

const deleteCommentLikeFn = async ({ postId, commentId }: ICommentLikeDelete) => {
   return (await axios.delete('/post/post-comment-like-delete', {
      data: { postId, commentId },
   })) as AxiosResponse<string>
}

const useLikeCommentDelete = () => {
   const { postsDispatch } = useContext(PostContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteCommentLikeFn,
      onSuccess(data) {
         if (data.status === 200) postsDispatch({ type: 'REMOVE_SINGLE_LIKE', payload: data.data })
      },
   })
   return { deleteCommentLikeMutation: mutate }
}

export default useLikeCommentDelete
