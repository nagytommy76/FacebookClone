import React, { createContext, useEffect, useReducer } from 'react'

import type { IPostComment } from '@/types/LikeTypes'
import CommentReducer, { initialCommentState, InitialCommentState, ICommentAction } from './CommentReducer'

interface ICommentContext {
   commentReducer: InitialCommentState
   commentDispatch: React.Dispatch<ICommentAction>
}

export const CommentContext = createContext<ICommentContext>({
   commentReducer: {
      singleComment: initialCommentState.singleComment,
      removedAnswerImageLink: null,
      postId: '',
      childAnswers: [],
      removedImageLink: null,
   },
   commentDispatch: () => {},
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

   return (
      <CommentContext.Provider
         value={{
            commentReducer,
            commentDispatch,
         }}
      >
         {children}
      </CommentContext.Provider>
   )
}

export default CommentContextProvider
