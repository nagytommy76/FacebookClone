import dynamic from 'next/dynamic'

const AddPostComponent = dynamic(() => import('./AddPost/AddPost'), { loading: () => <h1>Töltés</h1> })

const Posts = () => {
   return (
      <>
         <AddPostComponent />
         <h5>Valamint a már meglévő commentek listája</h5>
         <p>Minden külön Paper-ben</p>
      </>
   )
}

export default Posts
