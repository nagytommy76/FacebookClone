import dynamic from 'next/dynamic'
import useGetAllPosts from './Hooks/useGetAllPosts'
import useCheckUrl from './Hooks/useCheckUrl'
import useHandlePosts from './Hooks/useHandlePosts'

import PostContextProvider from '../../MainPage/Context/PostContextProvider'
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
   const { allPosts, setAllPosts, addNewPost, removeSinglePostById } = useHandlePosts()
   const isUrlChanged = useCheckUrl()
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
