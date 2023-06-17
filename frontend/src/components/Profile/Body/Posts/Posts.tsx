import { useContext } from 'react'
import dynamic from 'next/dynamic'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import PostContextProvider from '../../../MainPage/Context/PostContextProvider'
import type { IPost } from '../../../Posts/Types'

import SinglePost from '../../../../skeletons/SinglePost/SinglePost'
import AddPostSkeleton from '../../../../skeletons/AddPostSkeleton/AddPostSkeleton'
const PostHeader = dynamic(() => import('../../../Posts/SinglePost/Includes/PostHeader/PostHeader'))
const SinglePostComponent = dynamic(() => import('../../../Posts/SinglePost/SinglePost'), {
   loading: () => SinglePost(),
})
const AddPostComponent = dynamic(() => import('../../../Posts/AddPost/AddPost'), {
   loading: () => AddPostSkeleton(),
})

const Posts = () => {
   const {
      selectSelectedProfilePicture,
      profileReducer: { initialUserDataState },
   } = useContext(ProfileContext)

   return (
      <>
         <AddPostComponent addNewPost={() => {}} />
         <div>
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
         </div>
      </>
   )
}

export default Posts
