import React from 'react'
import { TabPanelProps } from '../../../../types/TabPanelTypes'

import { styled } from '@mui/material'

const StyledContainer = styled('section')(({ theme }) => ({
   minHeight: '250px',
}))

export default function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props

   return (
      <StyledContainer
         role='tabpanel'
         hidden={value !== index}
         id={`tabpanel-${index}`}
         aria-labelledby={`tab-${index}`}
         {...other}
      >
         {value === index && children}
      </StyledContainer>
   )
}
