import React from 'react'

import { HorizontalLineStyle, StyledLeftSide } from './Styles'
import { StyledProfileImage } from '@/src/styles/BaseStyles'

const LeftImage: React.FC<{ profilePicturePath: string; isChild: boolean }> = ({
   profilePicturePath,
   isChild,
}) => {
   return (
      <StyledLeftSide>
         <StyledProfileImage src={profilePicturePath} alt='profil' width={20} height={20} />
         <HorizontalLineStyle isChildComment={isChild} />
      </StyledLeftSide>
   )
}

export default LeftImage
