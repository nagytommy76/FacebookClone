import { useContext } from 'react'
import { PostContext } from '../../../../MainPage/Context/PostContextProvider'
import { PostsActions } from '../../../../MainPage/Context/PostReducer'
import { axiosInstance as axios, AxiosResponse } from '../../../../../utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { IPostLike, LikeTypes } from '../Types'

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
         postsDispatch({ type: PostsActions.ADD_POST_LIKE, payload: response.data })
         return response
      } catch (error) {
         console.log(error)
      }
   }

   const { mutate } = useMutation({
      mutationKey: ['likePost'],
      mutationFn: handleSendLike,
   })
   return { mutatePostLike: mutate }
}

export default useLikeMutate
