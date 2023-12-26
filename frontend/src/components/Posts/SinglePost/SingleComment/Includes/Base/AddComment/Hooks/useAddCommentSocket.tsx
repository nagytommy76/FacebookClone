import { useEffect, useContext } from 'react'
import { socket } from '@/src/utils/socketIo'
import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'
import { IPostComment } from '@/src/types/LikeTypes'

const useAddCommentSocket = () => {
   const { commentsDispatch } = useContext(AllCommentsContext)

   useEffect(() => {
      const onAddComment = (args: { newComments: IPostComment[] }[]) => {
         console.log(args)
         commentsDispatch({ type: 'ADD_NEW_COMMENT', payload: args[0].newComments })
      }
      socket.on('addComment', onAddComment)
      return () => {
         socket.off('addComment', onAddComment)
      }
   }, [commentsDispatch])

   return null
}

export default useAddCommentSocket
