import { useContext } from 'react'
import dynamic from 'next/dynamic'
import { ProfileContext } from '../../../Context/ProfileContextProvider'
import type { IPost } from '../../../../Posts/Types'

const SinglePostComponent = dynamic(() => import('../../../../Posts/SinglePost/SinglePost'), {
   loading: () => <h1>Töltés</h1>,
})

const OwnPosts = () => {
   const { isDataLoading, userData } = useContext(ProfileContext)
   if (isDataLoading) {
      return <h1>Ide majd egy Suspense component jön. TÖLTÉS</h1>
   }

   return (
      <div>
         {userData.posts &&
            userData.posts.map((post: IPost) => <SinglePostComponent key={post._id} singlePost={post} />)}
      </div>
   )
}

export default OwnPosts
