import { useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { ILike } from '@/src/types/LikeTypes'

const deleteLikeFn = async (postId: string) => {
   return (await axios.delete('/post/post-like-delete', { data: { postId } })) as AxiosResponse<{
      filteredLikes: ILike[]
   }>
}

const useLikeDelete = () => {
   const { postsDispatch } = useContext(PostContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteLikeFn,
      onSuccess(data) {
         if (data.status === 200)
            postsDispatch({ type: 'REMOVE_SINGLE_LIKE', payload: data.data.filteredLikes })
      },
   })
   return { deleteMutation: mutate }
}

export default useLikeDelete
