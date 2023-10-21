import { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const useDeletePost = () => {
   const {
      postsReducer: {
         singlePost: { _id },
      },
   } = useContext(PostContext)

   const removeMutationFn = async () => {
      return await axios.delete('/post/post-delete', { data: { postId: _id } })
   }

   const { mutate } = useMutation({
      mutationKey: ['RemovePostMutation'],
      mutationFn: removeMutationFn,
   })

   return { postDeleteMutation: mutate }
}

export default useDeletePost
