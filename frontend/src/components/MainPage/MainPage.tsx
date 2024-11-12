'use client'
import dynamic from 'next/dynamic'
import useGetAllPosts from './Hooks/useGetAllPosts'

const AllPostsComponent = dynamic(() => import('@/Base/PostsBase/PostsBase'))

export default function MainPage() {
   const { addNewPost, allPosts, removeSinglePostById, isLoading } = useGetAllPosts()
   return (
      <AllPostsComponent
         addNewPost={addNewPost}
         posts={allPosts}
         removeSinglePostById={removeSinglePostById}
         isLoading={isLoading}
      />
   )
}
