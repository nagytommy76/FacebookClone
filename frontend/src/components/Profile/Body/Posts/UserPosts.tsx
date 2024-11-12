import dynamic from 'next/dynamic'
import SinglePost from '@/Skeletons/SinglePost/SinglePost'
import useGetUserPosts from './Hooks/useGetUserPosts'

const PostsBase = dynamic(() => import('@/Base/PostsBase/PostsBase'), {
   loading: () => <SinglePost />,
})

export default function UserPosts() {
   const { isLoading, addNewPost, allPosts, removeSinglePostById } = useGetUserPosts()

   return (
      <PostsBase
         posts={allPosts}
         addNewPost={addNewPost}
         isLoading={isLoading}
         removeSinglePostById={removeSinglePostById}
      />
   )
}
