import React, { createContext, useEffect, useReducer, useMemo } from 'react'

import type { ICommentAnswers, IPostComment } from '@/types/LikeTypes'
import CommentReducer, { initialCommentState, InitialCommentState, ICommentAction } from './CommentReducer'

interface ICommentContext {
   commentReducer: InitialCommentState
   parentRootAnswers: ICommentAnswers[]
   commentDispatch: React.Dispatch<ICommentAction>
   getAnswerReplies(parentId: string): any
}

export const CommentContext = createContext<ICommentContext>({
   commentReducer: { singleComment: initialCommentState.singleComment, postId: '', childAnswers: [] },
   parentRootAnswers: [],
   commentDispatch: () => {},
   getAnswerReplies(parentId) {},
})

const CommentContextProvider: React.FC<{
   children: React.ReactNode
   singleComment: IPostComment
   postId: string
}> = ({ children, singleComment, postId }) => {
   const [commentReducer, commentDispatch] = useReducer(CommentReducer, initialCommentState)
   useEffect(() => {
      commentDispatch({ type: 'SET_COMMENT', payload: singleComment })
   }, [singleComment])
   useEffect(() => {
      commentDispatch({ type: 'SET_POSTID', payload: postId })
   }, [postId])

   const getCommentsByParentId = useMemo(() => {
      const grouppedAnswers: any = {}
      commentReducer.singleComment.commentAnswers?.map((answer) => {
         grouppedAnswers[answer.parentCommentId] ||= []
         grouppedAnswers[answer.parentCommentId].push(answer)
      })
      return grouppedAnswers
   }, [commentReducer.singleComment])

   function getAnswerReplies(parentId: string) {
      return getCommentsByParentId[parentId]
   }

   return (
      <CommentContext.Provider
         value={{
            commentReducer,
            parentRootAnswers: getCommentsByParentId['null'],
            commentDispatch,
            getAnswerReplies,
         }}
      >
         {children}
      </CommentContext.Provider>
   )
}

export default CommentContextProvider
