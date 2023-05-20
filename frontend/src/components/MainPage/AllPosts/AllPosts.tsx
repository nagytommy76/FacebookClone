import React from 'react'
import dynamic from 'next/dynamic'
import useGetAllPosts from './Hooks/useGetAllPosts'
import type { IPost, IProfilePicture } from '../../Posts/Types'

const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'))
const AddPostComponent = dynamic(() => import('../../Posts/AddPost/AddPost'))
const PostHeader = dynamic(() => import('../../Posts/SinglePost/Includes/PostHeader/PostHeader'))

const AllPosts = () => {
   const { allPosts, isLoading } = useGetAllPosts()
   if (isLoading) {
      return <h1>Egyelőre így, majd egy suspense conponens kell neki</h1>
   }

   const getSelectedProfilePicture = (profilePictures: IProfilePicture[]) => {
      return profilePictures.find((image) => image.isSelected)
   }

   return (
      <>
         <AddPostComponent />
         {allPosts &&
            allPosts.map((post: IPost) => (
               <SinglePostComponent key={post._id} singlePost={post}>
                  <PostHeader
                     createdAt={post.createdAt}
                     userInfo={post.userId}
                     selectSelectedProfilePicture={() =>
                        getSelectedProfilePicture(post.userId.userDetails.profilePicturePath)
                     }
                  />
               </SinglePostComponent>
            ))}
      </>
   )
}

export default AllPosts
