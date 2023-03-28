import { useState } from 'react'
import dynamic from 'next/dynamic'

import TabPanel from '../Includes/TabPanel'
import a11yProps from '../Includes/a11Props'

import { StyledTabContainer } from './AboutMeStyles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'

const WorkAndStudyComponent = dynamic(() => import('./WorkSchool/WorkSchool'), {
   loading: () => <p>Töltés kérlek várj...</p>,
})

const AboutMe = () => {
   const [value, setValue] = useState(0)

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
   }

   return (
      <StyledTabContainer>
         <Tabs
            orientation='vertical'
            variant='scrollable'
            value={value}
            onChange={handleChange}
            aria-label='About me tabs'>
            {/* Nem működik ha kiszedem külön komponensbe..... */}
            <Tab
               sx={{ '&.MuiButtonBase-root': { alignItems: 'flex-start' }, textTransform: 'none' }}
               label='Áttekintés'
               {...a11yProps(0)}
            />
            <Tab
               sx={{ '&.MuiButtonBase-root': { alignItems: 'flex-start' }, textTransform: 'none' }}
               label='Munkahelyek és tanulmányok'
               {...a11yProps(1)}
            />
            <Tab
               sx={{ '&.MuiButtonBase-root': { alignItems: 'flex-start' }, textTransform: 'none' }}
               label='Elérhetőségek és alapadatok'
               {...a11yProps(2)}
            />
            <Tab
               sx={{ '&.MuiButtonBase-root': { alignItems: 'flex-start' }, textTransform: 'none' }}
               label='Kapcsolatok'
               {...a11yProps(3)}
            />
         </Tabs>
         <Divider />
         <TabPanel value={value} index={0}>
            Item One
         </TabPanel>
         <TabPanel value={value} index={1}>
            <WorkAndStudyComponent />
         </TabPanel>
         <TabPanel value={value} index={2}>
            Item Three
         </TabPanel>
         <TabPanel value={value} index={3}>
            Kapcsolatok
         </TabPanel>
      </StyledTabContainer>
   )
}

export default AboutMe
