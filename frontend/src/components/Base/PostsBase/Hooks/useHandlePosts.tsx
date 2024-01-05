'use client'
import { useState } from 'react'
import type { IPost } from '@/src/types/PostTypes'
/**
 * @returns allPosts
 * @type IPost[]
 */
const useHandlePosts = () => {
   const [allPosts, setAllPosts] = useState<IPost[]>([])
   const addNewPost = (newPost: IPost) => {
      setAllPosts([...allPosts, newPost])
   }
   const removeSinglePostById = (toDeletePostId: string) => {
      setAllPosts((prevPosts) => {
         return prevPosts.filter((post) => post._id !== toDeletePostId)
      })
   }

   return {
      allPosts,
      setAllPosts,
      addNewPost,
      removeSinglePostById,
   }
}

export default useHandlePosts
