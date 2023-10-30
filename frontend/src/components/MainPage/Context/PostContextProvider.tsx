import React, { createContext, useReducer, useEffect } from 'react'
import PostsReducer, { initialPostsState, InitialPostsState, IPostsAction } from './PostReducer'
import { IPost } from '@/types/PostTypes'

interface IPostsContext {
   postsDispatch: React.Dispatch<IPostsAction>
   postsReducer: InitialPostsState
   removeSinglePostById: (toDeletePostId: string) => void
}

export const PostContext = createContext<IPostsContext>({
   postsDispatch: () => {},
   removeSinglePostById(toDeletePostId) {},
   postsReducer: {
      singlePost: initialPostsState.singlePost,
      commentsLength: initialPostsState.commentsLength,
   },
})

export default function PostContextProvider({
   children,
   singlePost,
   removeSinglePostById,
}: {
   children: React.ReactNode
   singlePost: IPost
   removeSinglePostById: (toDeletePostId: string) => void
}) {
   const [postsReducer, postsDispatch] = useReducer(PostsReducer, initialPostsState)
   useEffect(() => {
      if (singlePost) {
         postsDispatch({ type: 'SET_SINGLE_POST', payload: singlePost })
         postsDispatch({ type: 'SET_COMMENTS_LENGTH', payload: singlePost.comments.length })
      }
   }, [singlePost])
   return (
      <PostContext.Provider value={{ postsDispatch, postsReducer, removeSinglePostById }}>
         {children}
      </PostContext.Provider>
   )
}
