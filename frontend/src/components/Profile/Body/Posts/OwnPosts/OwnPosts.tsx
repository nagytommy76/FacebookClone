import dynamic from 'next/dynamic'
import useGetPosts from './Hooks/useGetPosts'
import type { IOwnPost } from './Types'

const SinglePostComponent = dynamic(() => import('./SinglePost/SinglePost'), {
   loading: () => <h1>Töltés</h1>,
})

const OwnPosts = () => {
   const { data, isLoading } = useGetPosts()
   if (isLoading) {
      return <h1>Ide majd egy Suspense component jön. TÖLTÉS</h1>
   }
   return (
      <div>
         {data && data.data.map((post: IOwnPost) => <SinglePostComponent singlePost={post} />)}
         <h1>Itt lesznek az én saját posztjaim</h1>
      </div>
   )
}

export default OwnPosts
