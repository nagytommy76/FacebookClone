import React, { useState } from 'react'
import useGetAllPosts from './Hooks/useGetAllPosts'
import PostsBase from '@/Base/PostsBase/PostsBase'
import type { IPost } from '@/types/PostTypes'

const AllPosts = () => {
   const [allPosts, setAllPosts] = useState<IPost[]>([])
   const addNewPost = (newPost: IPost) => {
      setAllPosts([...allPosts, newPost])
   }
   const { allPostsData } = useGetAllPosts(setAllPosts)
   return <PostsBase addNewPost={addNewPost} allPostsData={allPostsData} />
}

export default AllPosts
