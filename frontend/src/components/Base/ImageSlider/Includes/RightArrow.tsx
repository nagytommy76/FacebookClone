import React from 'react'
import { NavigateRightIconButtonStyle } from '../Styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const RightArrow: React.FC<{ nextImage: () => void }> = ({ nextImage }) => {
   return (
      <NavigateRightIconButtonStyle size='large' onClick={nextImage}>
         <ArrowBackIosNewIcon fontSize='inherit' />
      </NavigateRightIconButtonStyle>
   )
}

export default RightArrow
