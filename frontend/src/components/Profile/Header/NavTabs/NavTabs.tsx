import React from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const NavTabs = () => {
   return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
         <TabContext value='1'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <TabList onChange={() => {}} aria-label='lab API tabs example'>
                  <Tab label='Bejegyzések' value='1' />
                  <Tab label='Névjegy' value='2' />
                  <Tab label='Ismerős' value='3' />
                  <Tab label='Fényképek' value='4' />
               </TabList>
            </Box>
            <TabPanel value='1'>Itt lesznek egy külön komponensben az eddigi bejegyzések</TabPanel>
            <TabPanel value='2'>Item Two</TabPanel>
            <TabPanel value='3'>Item Three</TabPanel>
            <TabPanel value='4'>Item Three</TabPanel>
         </TabContext>
      </Box>
   )
}

export default NavTabs
