import { useContext, useEffect } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { socket } from '@/src/utils/socketIo'
import type { ILike } from '@/src/types/LikeTypes'

const useSocket = () => {
   const { postsDispatch } = useContext(PostContext)

   useEffect(() => {
      const onLikePost = (args: { likeType: ILike; toModifyPostId: string }) => {
         postsDispatch({
            type: 'ADD_SINGLE_SOCKET_POST_LIKE',
            payload: { likes: args.likeType, toModifyPostId: args.toModifyPostId },
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
