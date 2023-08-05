import React, { createContext, useReducer, useEffect } from 'react'
import PostsReducer, { initialPostsState, InitialPostsState, IPostsAction } from './PostReducer'
import { IPost } from '@/types/PostTypes'

interface IPostsContext {
   postsDispatch: React.Dispatch<IPostsAction>
   postsReducer: InitialPostsState
}

export const PostContext = createContext<IPostsContext>({
   postsDispatch: () => {},
   postsReducer: { singlePost: initialPostsState.singlePost },
})

export default function PostContextProvider({
   children,
   singlePost,
}: {
   children: React.ReactNode
   singlePost: IPost
}) {
   const [postsReducer, postsDispatch] = useReducer(PostsReducer, initialPostsState)
   useEffect(() => {
      if (singlePost) postsDispatch({ type: 'SET_SINGLE_POST', payload: singlePost })
   }, [singlePost])
   return <PostContext.Provider value={{ postsDispatch, postsReducer }}>{children}</PostContext.Provider>
}
