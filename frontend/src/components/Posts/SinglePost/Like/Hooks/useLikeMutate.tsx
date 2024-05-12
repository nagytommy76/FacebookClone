import { useContext } from 'react'
import { PostContext } from '../../../../MainPage/Context/PostContextProvider'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { IPostLike, LikeTypes } from '@/types/LikeTypes'

interface ISendLike {
   likeTypeFomInput: LikeTypes
   postId: string
}

const useLikeMutate = () => {
   const { postsDispatch } = useContext(PostContext)
   const handleSendLike = async ({ likeTypeFomInput, postId }: ISendLike) => {
      try {
         const response = (await axios.post('/post/post-like', {
            reactionType: likeTypeFomInput,
            postId,
         })) as AxiosResponse<IPostLike[]>
         return response
      } catch (error) {
         console.log(error)
      }
   }

   const { mutate } = useMutation({
      mutationKey: ['likePost'],
      mutationFn: handleSendLike,
      onSuccess(data, variables, context) {
         postsDispatch({ type: 'ADD_POST_LIKE', payload: data?.data })
      },
   })
   return { mutatePostLike: mutate }
}

export default useLikeMutate
