import { useCallback, useContext, useEffect } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { socket } from '@/src/utils/socketIo'
import type { IPostLike } from '@/src/types/LikeTypes'

const useSocket = () => {
   const { postsDispatch } = useContext(PostContext)

   const onLikePost = useCallback(
      (args: { likeType: IPostLike; postData: { _id: string } }[]) => {
         postsDispatch({
            type: 'ADD_SINGLE_SOCKET_POST_LIKE',
            payload: { likes: args[0].likeType, toModifyPostId: args[0].postData._id },
         })
      },
      [postsDispatch]
   )

   useEffect(() => {
      socket.on('likedPost', onLikePost)
      return () => {
         socket.off('likedPost', onLikePost)
      }
   }, [onLikePost])

   return null
}

export default useSocket
