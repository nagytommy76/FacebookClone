import React from 'react'
import type { LikeTypes, ReactionType } from '@/src/types/LikeTypes'
import { styled } from '@mui/material'
import useIcon from '../Hooks/useIcon'

import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'

const StyledTab = styled(Tab)({
   fontSize: 16,
   ['&.MuiButtonBase-root']: {
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      minHeight: 50,
      minWidth: 72,
   },
})

const TabHeader: React.FC<{
   reactionTypes: ReactionType
   setTabValue: React.Dispatch<React.SetStateAction<LikeTypes>>
   tabValue: LikeTypes
}> = ({ reactionTypes, setTabValue, tabValue }) => {
   const returnImage = useIcon()
   const handleChange = (event: React.SyntheticEvent, newValue: LikeTypes) => {
      setTabValue(newValue)
   }

   return (
      <TabList indicatorColor='primary' value={tabValue} onChange={handleChange} aria-label='icon tabs '>
         {Object.keys(reactionTypes).map((key, index) => (
            <StyledTab
               value={key}
               key={index}
               icon={returnImage(key as LikeTypes)}
               label={reactionTypes[key as LikeTypes].count}
               aria-label='phone'
            />
         ))}
      </TabList>
   )
}

export default TabHeader
