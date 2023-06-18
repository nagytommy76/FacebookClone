import { useContext } from 'react'
import dynamic from 'next/dynamic'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import PostContextProvider from '../../../MainPage/Context/PostContextProvider'
import { UserDataActions } from '../../Context/ProfileReducer'
import type { IPost } from '@/types/PostTypes'

import SinglePost from '@/src/skeletons/SinglePost/SinglePost'
import AddPostSkeleton from '@/src/skeletons/AddPostSkeleton/AddPostSkeleton'
const PostHeader = dynamic(() => import('@/components/Posts/SinglePost/Includes/PostHeader/PostHeader'))
const SinglePostComponent = dynamic(() => import('@/components/Posts/SinglePost/SinglePost'), {
   loading: () => SinglePost(),
})
const AddPostComponent = dynamic(() => import('@/components/Posts/AddPost/AddPost'), {
   loading: () => AddPostSkeleton(),
})

const Posts = () => {
   const {
      selectSelectedProfilePicture,
      profileDispatch,
      profileReducer: { initialUserDataState },
   } = useContext(ProfileContext)
   const addNewPost = (newPost: IPost) => {
      profileDispatch({ type: UserDataActions.ADD_NEW_POST, payload: newPost })
   }
   return (
      <>
         <AddPostComponent addNewPost={addNewPost} />
         {initialUserDataState.posts &&
            initialUserDataState.posts.map((post: IPost) => (
               <PostContextProvider key={post._id} singlePost={post}>
                  <SinglePostComponent>
                     <PostHeader
                        selectSelectedProfilePicture={selectSelectedProfilePicture}
                        userInfo={initialUserDataState}
                        createdAt={post.createdAt}
                     />
                  </SinglePostComponent>
               </PostContextProvider>
            ))}
      </>
   )
}

export default Posts
