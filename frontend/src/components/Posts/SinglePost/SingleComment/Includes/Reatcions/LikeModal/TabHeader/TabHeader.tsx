import React from 'react'
import type { LikeTypes, ReactionType } from '@/src/types/LikeTypes'
import { styled } from '@mui/material'
import useIcon from '../Hooks/useIcon'

import Tabs from '@mui/material/Tabs'
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
   reactionTypes: ReactionType<LikeTypes>
   setTabValue: React.Dispatch<React.SetStateAction<number>>
   tabValue: number
}> = ({ reactionTypes, setTabValue, tabValue }) => {
   const returnImage = useIcon()
   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }

   return (
      <Tabs indicatorColor='primary' value={tabValue} onChange={handleChange} aria-label='icon tabs '>
         {Object.entries(reactionTypes).map((key: [string, string], index: number) => (
            <StyledTab
               key={index}
               icon={returnImage(key[0] as LikeTypes)}
               label={reactionTypes[key[0]].count}
               aria-label='phone'
            />
         ))}
      </Tabs>
   )
}

export default TabHeader
