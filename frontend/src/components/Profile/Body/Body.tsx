import React from 'react'

import { BodyPaper } from './Styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface TabPanelProps {
   children?: React.ReactNode
   index: number
   value: number
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}>
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   )
}

const Body: React.FC<{ tabValue: number }> = ({ tabValue }) => {
   return (
      <BodyPaper elevation={1}>
         <TabPanel value={tabValue} index={0}>
            Bejegyzések jönnek ide
         </TabPanel>
         <TabPanel value={tabValue} index={1}>
            Névjegy jön ide, iskola, munkahelyek stb
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
