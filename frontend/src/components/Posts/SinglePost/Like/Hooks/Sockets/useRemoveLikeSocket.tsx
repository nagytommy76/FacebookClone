import { useContext, useEffect } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { socket } from '@/src/utils/socketIo'
import type { ILike } from '@/src/types/LikeTypes'

const useRemoveLikeSocket = () => {
   const { postsDispatch } = useContext(PostContext)

   useEffect(() => {
      const onDislikePost = (args: { likeType: ILike; postData: { _id: string } }[]) => {
         postsDispatch({
            type: 'REMOVE_SINGLE_LIKE',
            payload: args[0].likeType,
         })
      }

      socket.on('dislikedPost', onDislikePost)
      return () => {
         socket.off('dislikedPost', onDislikePost)
      }
   }, [postsDispatch])
   return null
}

export default useRemoveLikeSocket
