import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'

const deleteLikeFn = async (postId: string) => {
   return await axios.delete('/post/post-like-delete', { data: { postId } })
}

const useLikeDelete = () => {
   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteLikeFn,
   })
   return { deleteMutation: mutate }
}

export default useLikeDelete
