import { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
import { AxiosResponse, axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import useRemoveImages from './useRemoveImages'

const useDeletePost = (removeSinglePostById: (toDeletePostId: string) => void) => {
   const {
      postsReducer: {
         singlePost: { _id, postedPicturesPath },
      },
   } = useContext(PostContext)
   const deleteAllImagesFromFirebase = useRemoveImages()

   const removeMutationFn = async () => {
      return await axios.delete('/post/post-delete', { data: { postId: _id } })
   }

   const { mutate } = useMutation({
      mutationKey: ['RemovePostMutation'],
      mutationFn: removeMutationFn,
      onSuccess: async (data) => {
         await deleteAllImagesFromFirebase(postedPicturesPath)
         removeSinglePostById(_id)
      },
   })

   return { postDeleteMutation: mutate }
}

export default useDeletePost
