import dynamic from 'next/dynamic'
import React from 'react'
import PostContextProvider from '../../MainPage/Context/PostContextProvider'
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

const PostsBase: React.FC<{ addNewPost: (newPost: IPost) => void; allPostsData: IPost[] | undefined }> = ({
   addNewPost,
   allPostsData,
}) => {
   const getSelectedProfilePicture = (profilePictures: IProfilePicture[]) => {
      return profilePictures.find((image) => image.isSelected)
   }

   return (
      <>
         <AddPostComponent addNewPost={addNewPost} />
         {allPostsData &&
            allPostsData.map((post: IPost) => (
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

export default PostsBase
