import React, { createContext, useReducer, useEffect } from 'react'
import PostsReducer, { initialPostsState, InitialPostsState, IPostsAction, PostsActions } from './PostReducer'
import { IPost } from '../../Posts/Types'

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
      if (singlePost) postsDispatch({ type: PostsActions.SET_SINGLE_POST, payload: singlePost })
   }, [singlePost])
   return <PostContext.Provider value={{ postsDispatch, postsReducer }}>{children}</PostContext.Provider>
}
