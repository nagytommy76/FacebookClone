import React from 'react'
import dynamic from 'next/dynamic'
import useGetAllPosts from './Hooks/useGetAllPosts'
import type { IPost } from '../../Profile/Body/Posts/OwnPosts/Types'

const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'))
const AddPostComponent = dynamic(() => import('../../Posts/AddPost/AddPost'))

const AllPosts = () => {
   const { allPosts, isLoading } = useGetAllPosts()
   if (isLoading) {
      return <h1>Egyelőre így, majd egy suspense conponens kell neki</h1>
   }
   return (
      <>
         <AddPostComponent />
         {allPosts && allPosts.map((post: IPost) => <SinglePostComponent key={post._id} singlePost={post} />)}
      </>
   )
}

export default AllPosts
