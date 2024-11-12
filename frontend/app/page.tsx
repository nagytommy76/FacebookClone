import dynamic from 'next/dynamic'
import MainPage from '@/components/MainPage/MainPage'
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
            <MainPage />
         </div>
         <AcceptedFriends />
      </section>
   )
}

export default HomePage
