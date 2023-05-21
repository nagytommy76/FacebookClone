import React, { createContext, useReducer, useEffect } from 'react'
import PostsReducer, { initialPostsState, InitialPostsState, IPostsAction, PostsActions } from './PostReducer'
import useGetAllPosts from '../AllPosts/Hooks/useGetAllPosts'

interface IPostsContext {
   postsDispatch: React.Dispatch<IPostsAction>
   postsReducer: InitialPostsState
}

export const PostsContext = createContext<IPostsContext>({
   postsDispatch: () => {},
   postsReducer: { posts: initialPostsState.posts },
})

export default function PostsContextProvider({ children }: { children: React.ReactNode }) {
   const [postsReducer, postsDispatch] = useReducer(PostsReducer, initialPostsState)
   const { data, isLoading } = useGetAllPosts()
   useEffect(() => {
      if (data) postsDispatch({ type: PostsActions.SET_POSTS, payload: data })
   }, [data])
   return <PostsContext.Provider value={{ postsDispatch, postsReducer }}>{children}</PostsContext.Provider>
}
