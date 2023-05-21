import { useContext } from 'react'
import dynamic from 'next/dynamic'
import { ProfileContext } from '../../../Context/ProfileContextProvider'
import type { IPost } from '../../../../Posts/Types'

const PostHeader = dynamic(() => import('../../../../Posts/SinglePost/Includes/PostHeader/PostHeader'))
const SinglePostComponent = dynamic(() => import('../../../../Posts/SinglePost/SinglePost'), {
   loading: () => <h1>Töltés</h1>,
})

const OwnPosts = () => {
   const {
      isDataLoading,
      selectSelectedProfilePicture,
      profileReducer: { initialUserDataState },
   } = useContext(ProfileContext)
   if (isDataLoading) {
      return <h1>Ide majd egy Suspense component jön. TÖLTÉS</h1>
   }

   return (
      <div>
         {initialUserDataState.posts &&
            initialUserDataState.posts.map((post: IPost) => (
               <SinglePostComponent key={post._id} singlePost={post}>
                  <PostHeader
                     selectSelectedProfilePicture={selectSelectedProfilePicture}
                     userInfo={initialUserDataState}
                     createdAt={post.createdAt}
                  />
               </SinglePostComponent>
            ))}
      </div>
   )
}

export default OwnPosts
