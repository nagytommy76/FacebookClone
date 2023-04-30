import dynamic from 'next/dynamic'

const AddPostComponent = dynamic(() => import('../../../Posts/AddPost/AddPost'), {
   loading: () => <h1>Töltés</h1>,
})
const OwnPostsComponent = dynamic(() => import('./OwnPosts/OwnPosts'), { loading: () => <h1>Töltés</h1> })

const Posts = () => {
   return (
      <>
         <AddPostComponent />
         <OwnPostsComponent />
      </>
   )
}

export default Posts
