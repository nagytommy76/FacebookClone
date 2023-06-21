import React, { useState } from 'react'

import { StyledModalContainer, StyledImageContainer, CloseIconStyle, StyledModalImage } from './Styles'
import Modal from '@mui/material/Modal'
// import Fade from '@mui/material/Fade'
import LeftArrow from './Includes/LeftArrow'
const ImageSlider: React.FC<{
   isImgSliderOpen: boolean
   postedPicturesPath: string[]
   currentPicIndex: number
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isImgSliderOpen, postedPicturesPath, currentPicIndex, setIsImgSliderOpen }) => {
   //    const [currentPic, setCurrentPic] = useState<number>(0)
   const [direction, setDirection] = useState<'left' | 'up' | 'down' | 'right'>('right')
   const [isSlide, setIsSlide] = useState<boolean>(true)

   return (
      <Modal open={isImgSliderOpen}>
         <StyledModalContainer>
            <CloseIconStyle onClick={() => setIsImgSliderOpen(false)} />
            {/* <Fade in={isSlide}> */}
            <StyledImageContainer>
               <StyledModalImage
                  width={1920}
                  height={1080}
                  src={postedPicturesPath[currentPicIndex]}
                  alt=''
               />
            </StyledImageContainer>
            {/* </Fade> */}
            <LeftArrow />
         </StyledModalContainer>
      </Modal>
   )
}

export default ImageSlider
