import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import PostContextProvider from '../../MainPage/Context/PostContextProvider'
import useGetAllPosts from './Hooks/useGetAllPosts'
import type { IPost } from '@/types/PostTypes'

import SinglePostSkeleton from '@/src/skeletons/SinglePost/SinglePost'
import AddPostSkeleton from '@/src/skeletons/AddPostSkeleton/AddPostSkeleton'
import PostHeaderSkeleton from '@/Skeletons/SinglePost/PostHeader'

const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'), {
   loading: () => <SinglePostSkeleton />,
})
const AddPostComponent = dynamic(() => import('../../Posts/AddPost/AddPost'), {
   loading: () => <AddPostSkeleton />,
})
const PostHeader = dynamic(() => import('../../Posts/SinglePost/Includes/PostHeader/PostHeader'), {
   loading: () => <PostHeaderSkeleton asStandalone={true} />,
})

const PostsBase = () => {
   const [allPosts, setAllPosts] = useState<IPost[]>([])
   const addNewPost = (newPost: IPost) => {
      setAllPosts([...allPosts, newPost])
   }
   const removeSinglePostById = (toDeletePostId: string) => {
      setAllPosts((prevPosts) => {
         return prevPosts.filter((post) => post._id !== toDeletePostId)
      })
   }
   const { isLoading } = useGetAllPosts(setAllPosts)

   return (
      <>
         <AddPostComponent addNewPost={addNewPost} />
         {!isLoading ? (
            allPosts.map((post: IPost) => (
               <PostContextProvider key={post._id} singlePost={post}>
                  <SinglePostComponent>
                     <PostHeader
                        removeSinglePostById={removeSinglePostById}
                        createdAt={post.createdAt}
                        userInfo={post.userId}
                     />
                  </SinglePostComponent>
               </PostContextProvider>
            ))
         ) : (
            <SinglePostSkeleton />
         )}
      </>
   )
}

export default PostsBase
