import { useContext } from 'react'
import { PostContext } from '../../../../../MainPage/Context/PostContextProvider'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '../../../../../../utils/axiosSetup/AxiosInstance'

const deleteLikeFn = async (postId: string) => {
   return (await axios.delete('/post/post-like-delete', { data: { postId } })) as AxiosResponse<string>
}

const useLikeDelete = () => {
   const { postsDispatch } = useContext(PostContext)
   const { mutate } = useMutation({
      mutationKey: ['deleteLike'],
      mutationFn: deleteLikeFn,
      onSuccess(data) {
         if (data.status === 200) postsDispatch({ type: 'REMOVE_SINGLE_LIKE', payload: data.data })
      },
   })
   return { deleteMutation: mutate }
}

export default useLikeDelete
