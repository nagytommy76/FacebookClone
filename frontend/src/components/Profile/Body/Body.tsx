import dynamic from 'next/dynamic'

import TabPanel from './Includes/TabPanel'
const AboutMeComponent = dynamic(() => import('./AboutMe/AboutMe'), { loading: () => <h2>Töltés...</h2> })
const PostsComponent = dynamic(() => import('./Posts/Posts'), { loading: () => <h2>Töltés!!!4444...</h2> })

const Body: React.FC<{ tabValue: number }> = ({ tabValue }) => {
   return (
      <>
         <TabPanel value={tabValue} index={0}>
            <PostsComponent />
         </TabPanel>
         <TabPanel value={tabValue} index={1}>
            <AboutMeComponent />
         </TabPanel>
         <TabPanel value={tabValue} index={2}>
            Ismerősök
         </TabPanel>
         <TabPanel value={tabValue} index={3}>
            Fényképek jönnek ide
         </TabPanel>
      </>
   )
}

export default Body
