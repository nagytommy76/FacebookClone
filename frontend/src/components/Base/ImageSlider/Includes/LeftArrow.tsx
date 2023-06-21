import React from 'react'
import { NavigateIconButtonStyle } from '../Styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const LeftArrow = () => {
   return (
      <NavigateIconButtonStyle size='large'>
         <ArrowBackIosNewIcon fontSize='inherit' />
      </NavigateIconButtonStyle>
   )
}

export default LeftArrow
