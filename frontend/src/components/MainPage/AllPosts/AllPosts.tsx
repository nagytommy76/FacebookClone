import React, { useContext } from 'react'
import dynamic from 'next/dynamic'
import { PostsContext } from '../Context/PostsContextProvider'

import type { IPost, IProfilePicture } from '../../Posts/Types'

const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'))
const AddPostComponent = dynamic(() => import('../../Posts/AddPost/AddPost'))
const PostHeader = dynamic(() => import('../../Posts/SinglePost/Includes/PostHeader/PostHeader'))

const AllPosts = () => {
   const { postsReducer } = useContext(PostsContext)
   const getSelectedProfilePicture = (profilePictures: IProfilePicture[]) => {
      return profilePictures.find((image) => image.isSelected)
   }
   return (
      <>
         <AddPostComponent />
         {postsReducer.posts &&
            postsReducer.posts.map((post: IPost) => (
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
