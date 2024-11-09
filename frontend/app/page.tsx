import dynamic from 'next/dynamic'

const AllPostsComponent = dynamic(() => import('@/Base/PostsBase/PostsBase'))
const AcceptedFriends = dynamic(() => import('@/components/MainPage/AcceptedFriends/AcceptedFriends'))

const HomePage = async () => {
   return (
      <section
         style={{
            position: 'relative',
            width: '100%',
            minHeight: '100%',
            margin: 'auto',

            display: 'flex',
            justifyContent: 'center',

            overflowX: 'hidden',
         }}
      >
         <div style={{ maxWidth: '800px' }}>
            <AllPostsComponent />
         </div>
         <AcceptedFriends />
      </section>
   )
}

export default HomePage
