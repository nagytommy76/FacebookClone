import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import PostContextProvider from '../../MainPage/Context/PostContextProvider'
import useGetAllPosts from './Hooks/useGetAllPosts'
import type { IPost } from '@/types/PostTypes'

import SinglePostSkeleton from '@/src/skeletons/SinglePost/SinglePost'
import AddPostSkeleton from '@/src/skeletons/AddPostSkeleton/AddPostSkeleton'
import PostHeaderSkeleton from '@/Skeletons/SinglePost/PostHeader'

const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'), {
   loading: () => <SinglePostSkeleton />,
})
const AddPostComponent = dynamic(() => import('../../Posts/HandlePosts/AddPost/AddPost'), {
   loading: () => <AddPostSkeleton />,
})
const PostHeader = dynamic(() => import('../../Posts/SinglePost/Includes/PostHeader/PostHeader'), {
   loading: () => <PostHeaderSkeleton asStandalone={true} />,
})

const PostsBase: React.FC<{ isGetUsersPosts?: boolean }> = ({ isGetUsersPosts = false }) => {
   const router = useRouter()
   const [allPosts, setAllPosts] = useState<IPost[]>([])
   const [isUrlChanged, setIsUrlChanged] = useState<boolean>(false)

   useEffect(() => {
      console.log('route change with dependency', router.pathname)
      setIsUrlChanged((prev) => !prev)
      setTimeout(() => {
         console.log(isUrlChanged)
      }, 1500)
   }, [router])

   const addNewPost = (newPost: IPost) => {
      setAllPosts([...allPosts, newPost])
   }
   const removeSinglePostById = (toDeletePostId: string) => {
      setAllPosts((prevPosts) => {
         return prevPosts.filter((post) => post._id !== toDeletePostId)
      })
   }
   const { isLoading } = useGetAllPosts(setAllPosts, isGetUsersPosts, isUrlChanged)

   return (
      <>
         <AddPostComponent addNewPost={addNewPost} />
         {!isLoading ? (
            allPosts.map((post: IPost) => (
               <PostContextProvider
                  removeSinglePostById={removeSinglePostById}
                  key={post._id}
                  singlePost={post}
               >
                  <SinglePostComponent>
                     <PostHeader />
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
