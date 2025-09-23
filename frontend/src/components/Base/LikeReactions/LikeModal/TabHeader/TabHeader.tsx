import React from 'react'
import type { LikeTypes, ReactionType } from '@/src/types/LikeTypes'
import useIcon from '../Hooks/useIcon'

import CloseIcon from '@mui/icons-material/Close'
import TabList from '@mui/lab/TabList'

import { StyledIconButton, StyledTab } from '../Style'

const TabHeader: React.FC<{
   reactionTypes: ReactionType
   setTabValue: React.Dispatch<React.SetStateAction<LikeTypes | 'all'>>
   handleCloseModal: () => void
}> = ({ reactionTypes, setTabValue, handleCloseModal }) => {
   const returnImage = useIcon()
   const handleChange = (event: React.SyntheticEvent, newValue: LikeTypes) => {
      setTabValue(newValue)
   }

   return (
      <TabList indicatorColor='primary' onChange={handleChange} aria-label='icon tabs '>
         <StyledIconButton onClick={handleCloseModal}>
            <CloseIcon />
         </StyledIconButton>
         <StyledTab value='all' label='Az összes' />
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
