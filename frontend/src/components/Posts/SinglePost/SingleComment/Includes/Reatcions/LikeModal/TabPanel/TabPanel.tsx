import { TabPanelProps } from '@/src/types/TabPanelTypes'
import React from 'react'

function CustomTabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <h1>{children}</h1>}
      </div>
   )
}

const TabPanel: React.FC<{ tabValue: number }> = ({ tabValue }) => {
   return (
      <CustomTabPanel value={tabValue} index={0}>
         Item One
      </CustomTabPanel>
   )
}

export default TabPanel
