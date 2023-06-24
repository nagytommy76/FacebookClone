import React from 'react'
import { NavigateLeftIconButtonStyle } from '../Styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const LeftArrow: React.FC<{ previousImage: () => void }> = ({ previousImage }) => {
   return (
      <NavigateLeftIconButtonStyle size='large' onClick={previousImage}>
         <ArrowBackIosNewIcon fontSize='inherit' />
      </NavigateLeftIconButtonStyle>
   )
}

export default LeftArrow
