import React, { createContext, useEffect, useReducer, useMemo } from 'react'

import type { IPostComment } from '@/types/LikeTypes'
import CommentReducer, {
   initialCommentState,
   CommentActions,
   InitialCommentState,
   ICommentAction,
} from './CommentReducer'

interface ICommentContext {
   commentReducer: InitialCommentState
   commentDispatch: React.Dispatch<ICommentAction>
   getAnswerReplies(parentId: string): any
}

export const CommentContext = createContext<ICommentContext>({
   commentDispatch: () => {},
   commentReducer: { singleComment: initialCommentState.singleComment, postId: '', childAnswers: [] },
   getAnswerReplies(parentId) {},
})

const CommentContextProvider: React.FC<{
   children: React.ReactNode
   singleComment: IPostComment
   postId: string
}> = ({ children, singleComment, postId }) => {
   const [commentReducer, commentDispatch] = useReducer(CommentReducer, initialCommentState)
   useEffect(() => {
      commentDispatch({ type: CommentActions.SET_COMMENT, payload: singleComment })
   }, [singleComment])
   useEffect(() => {
      commentDispatch({ type: CommentActions.SET_POSTID, payload: postId })
   }, [postId])

   const getCommentsByParentId = useMemo(() => {
      const grouppedAnswers: any = {}
      commentReducer.singleComment.commentAnswers?.map((answer) => {
         grouppedAnswers[answer.parentCommentId] ||= []
         grouppedAnswers[answer.parentCommentId].push(answer)
      })
      console.log(grouppedAnswers)
      return grouppedAnswers
   }, [commentReducer.singleComment])

   function getAnswerReplies(parentId: string) {
      return getCommentsByParentId[parentId]
   }

   return (
      <CommentContext.Provider value={{ commentDispatch, commentReducer, getAnswerReplies }}>
         {children}
      </CommentContext.Provider>
   )
}

export default CommentContextProvider
