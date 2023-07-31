import React from 'react'
import { LikeTypes, ReactionType } from '@/src/types/LikeTypes'

// import TabPanel from '../TabPanel/TabPanel'
import TabPanel from '@mui/lab/TabPanel'

const TabBody: React.FC<{ tabValue: LikeTypes; reactionTypes: ReactionType }> = ({
   tabValue,
   reactionTypes,
}) => {
   return (
      <TabPanel value={tabValue}>
         {reactionTypes[tabValue].reactors.map((reactor, index) => (
            <p key={index}>
               {reactor.firstName} {reactor.sureName}
            </p>
         ))}
      </TabPanel>
   )
}

export default TabBody
