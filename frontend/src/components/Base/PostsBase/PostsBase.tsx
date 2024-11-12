'use client'
import dynamic from 'next/dynamic'
import PostContextProvider from '../../MainPage/Context/PostContextProvider'
import type { IPost } from '@/types/PostTypes'

import SinglePostSkeleton from '@/Skeletons/SinglePost/SinglePost'
import PostHeaderSkeleton from '@/Skeletons/SinglePost/PostHeader'

import AddPost from './Includes/AddPost'
const SinglePostComponent = dynamic(() => import('../../Posts/SinglePost/SinglePost'), {
   loading: () => <SinglePostSkeleton />,
})
const PostHeader = dynamic(() => import('../../Posts/SinglePost/Includes/PostHeader/PostHeader'), {
   loading: () => <PostHeaderSkeleton asStandalone={true} />,
})
const EmptyPost = dynamic(() => import('./Includes/EmptyPost'))

const PostsBase: React.FC<{
   posts?: IPost[]
   isLoading: boolean
   addNewPost: (newPost: IPost) => void
   removeSinglePostById: (toDeletePostId: string) => void
}> = ({ posts, isLoading = true, addNewPost, removeSinglePostById }) => {
   return (
      <>
         <AddPost addNewPost={addNewPost} />
         {!isLoading ? (
            posts !== undefined ? (
               posts.map((post: IPost) => (
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
               <EmptyPost />
            )
         ) : (
            <SinglePostSkeleton />
         )}
      </>
   )
}

export default PostsBase
