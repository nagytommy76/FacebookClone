import { useContext } from 'react'
import { ProfileContext } from '../Context/ProfileContextProvider'
import dynamic from 'next/dynamic'

import TabPanel from './Includes/TabPanel'
import UserPosts from './Posts/UserPosts'
import Friends from './Friends/Friends'
import PostProfileImage from './PostProfileImage/PostProfileImage'

const AboutMeComponent = dynamic(() => import('./AboutMe/AboutMe'), { loading: () => <h2>Töltés...</h2> })

const Body = () => {
   const tabValue = useContext(ProfileContext).tabValue
   return (
      <>
         <TabPanel value={tabValue} index={0}>
            <UserPosts />
         </TabPanel>
         <TabPanel value={tabValue} index={1}>
            <AboutMeComponent />
         </TabPanel>
         <TabPanel value={tabValue} index={2}>
            <Friends />
         </TabPanel>
         <TabPanel value={tabValue} index={3}>
            <PostProfileImage />
         </TabPanel>
      </>
   )
}

export default Body
