import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import useGetAllPosts from './Hooks/useGetAllPosts'
import PostContextProvider from '../Context/PostContextProvider'

import type { IPost, IProfilePicture } from '@/types/PostTypes'

import SinglePostSkeleton from '@/src/skeletons/SinglePost/SinglePost'
import AddPostSkeleton from '@/src/skeletons/AddPostSkeleton/AddPostSkeleton'
const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'), {
   loading: () => SinglePostSkeleton(),
})
const AddPostComponent = dynamic(() => import('../../Posts/AddPost/AddPost'), {
   loading: () => AddPostSkeleton(),
})
const PostHeader = dynamic(() => import('../../Posts/SinglePost/Includes/PostHeader/PostHeader'))

const AllPosts = () => {
   const [allPosts, setAllPosts] = useState<IPost[]>([])
   const addNewPost = (newPost: IPost) => {
      setAllPosts([...allPosts, newPost])
   }
   const { isLoading } = useGetAllPosts(setAllPosts)
   const getSelectedProfilePicture = (profilePictures: IProfilePicture[]) => {
      return profilePictures.find((image) => image.isSelected)
   }
   return (
      <>
         <AddPostComponent addNewPost={addNewPost} />
         {!isLoading &&
            allPosts &&
            allPosts.map((post: IPost) => (
               <PostContextProvider key={post._id} singlePost={post}>
                  <SinglePostComponent>
                     <PostHeader
                        createdAt={post.createdAt}
                        userInfo={post.userId}
                        selectSelectedProfilePicture={() =>
                           getSelectedProfilePicture(post.userId.userDetails.profilePicturePath)
                        }
                     />
                  </SinglePostComponent>
               </PostContextProvider>
            ))}
      </>
   )
}

export default AllPosts
