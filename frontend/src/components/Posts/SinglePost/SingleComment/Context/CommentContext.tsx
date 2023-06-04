import React, { createContext, useState } from 'react'
import type { IPostComment } from '../../Like/Types'

interface ICommentContext {
   comment: IPostComment
   setComment: React.Dispatch<React.SetStateAction<IPostComment>>
}

export const CommentContext = createContext<ICommentContext>({
   comment: {} as IPostComment,
   setComment: () => {},
})

const CommentContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [comment, setComment] = useState<IPostComment>({} as IPostComment)
   return <CommentContext.Provider value={{ comment, setComment }}>{children}</CommentContext.Provider>
}

export default CommentContextProvider
