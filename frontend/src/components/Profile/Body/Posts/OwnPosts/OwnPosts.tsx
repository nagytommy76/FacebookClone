import dynamic from 'next/dynamic'
import useGetPosts from './Hooks/useGetPosts'
import type { IPost } from '../../../../Posts/Types'

const SinglePostComponent = dynamic(() => import('../../../../Posts/SinglePost/SinglePost'), {
   loading: () => <h1>Töltés</h1>,
})

const OwnPosts = () => {
   const { data, isLoading } = useGetPosts()
   if (isLoading) {
      return <h1>Ide majd egy Suspense component jön. TÖLTÉS</h1>
   }
   return (
      <div>
         {data && data.data.map((post: IPost) => <SinglePostComponent key={post._id} singlePost={post} />)}
      </div>
   )
}

export default OwnPosts
