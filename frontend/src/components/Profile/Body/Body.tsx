import dynamic from 'next/dynamic'

import { BodyPaper } from './Styles'

import TabPanel from './Includes/TabPanel'
const AboutMeComponent = dynamic(() => import('./AboutMe/AboutMe'), { loading: () => <h2>Töltés...</h2> })

const Body: React.FC<{ tabValue: number }> = ({ tabValue }) => {
   return (
      <BodyPaper elevation={1}>
         <TabPanel value={tabValue} index={0}>
            Bejegyzések jönnek ide
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
      </BodyPaper>
   )
}

export default Body
