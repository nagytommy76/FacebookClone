import { useContext } from 'react'
import { ProfileContext } from '../Context/ProfileContextProvider'
import dynamic from 'next/dynamic'

import TabPanel from './Includes/TabPanel'
import UserPosts from './Posts/UserPosts'

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
            Itt majd a már felvett ismerősöket tudom kezelni, megnézni stb
         </TabPanel>
         <TabPanel value={tabValue} index={3}>
            Fényképeket (Poszt/profil stb. összes) tudom megnézni
         </TabPanel>
      </>
   )
}

export default Body
