import { useContext, useEffect } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { socket } from '@/src/utils/socketIo'
import type { IPostLike } from '@/src/types/LikeTypes'

const useSocket = () => {
   const { postsDispatch } = useContext(PostContext)

   useEffect(() => {
      const onLikePost = (args: { likeType: IPostLike; postData: { _id: string } }[]) => {
         postsDispatch({
            type: 'ADD_SINGLE_SOCKET_POST_LIKE',
            payload: { likes: args[0].likeType, toModifyPostId: args[0].postData._id },
         })
      }

      socket.on('likedPost', onLikePost)
      return () => {
         socket.off('likedPost', onLikePost)
      }
   }, [postsDispatch])

   return null
}

export default useSocket
