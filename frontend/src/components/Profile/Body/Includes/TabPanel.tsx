import React from 'react'
import { TabPanelProps } from '../../Types/Types'

import Box from '@mui/material/Box'

export default function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props

   return (
      <div
         role='tabpanel'
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}>
         {value === index && <Box sx={{ p: '7px' }}>{children}</Box>}
      </div>
   )
}
