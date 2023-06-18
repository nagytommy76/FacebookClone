import React, { createContext, useEffect, useReducer } from 'react'

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
}

export const CommentContext = createContext<ICommentContext>({
   commentDispatch: () => {},
   commentReducer: { singleComment: initialCommentState.singleComment },
})

const CommentContextProvider: React.FC<{ children: React.ReactNode; singleComment: IPostComment }> = ({
   children,
   singleComment,
}) => {
   const [commentReducer, commentDispatch] = useReducer(CommentReducer, initialCommentState)
   useEffect(() => {
      commentDispatch({ type: CommentActions.SET_COMMENT, payload: singleComment })
   }, [singleComment])
   return (
      <CommentContext.Provider value={{ commentDispatch, commentReducer }}>
         {children}
      </CommentContext.Provider>
   )
}

export default CommentContextProvider
