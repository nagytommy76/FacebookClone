import React from 'react'
import dynamic from 'next/dynamic'

import { BodyPaper } from './Styles'

import TabPanel from './Includes/TabPanel'
const AboutMeComponent = dynamic(() => import('./AboutMe/AboutMe'))

const Body: React.FC<{ tabValue: number }> = ({ tabValue }) => {
   return (
      <BodyPaper elevation={1}>
         <TabPanel value={tabValue} index={0}>
            Bejegyzések jönnek ide
         </TabPanel>
         <TabPanel value={tabValue} index={1}>
            <React.Suspense fallback={<h2>Töltés...</h2>}>
               <AboutMeComponent />
            </React.Suspense>
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
