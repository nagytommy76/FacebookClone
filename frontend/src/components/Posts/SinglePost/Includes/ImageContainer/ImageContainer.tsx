import React from 'react'
import {
   StyledImageGridContainer,
   StyledImage,
   FirstGridImage,
   OverlayedContent,
   OverlayedContainer,
} from './Styles'
import StockImage from '@/assets/facebook-profile.jpg'

const ImageContainer: React.FC<{
   postedPicturesPath: string[]
   setCurrentPicIndex: React.Dispatch<React.SetStateAction<number>>
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ postedPicturesPath, setCurrentPicIndex, setIsImgSliderOpen }) => {
   const setPicIndexAndOpenModal = (index: number) => {
      setCurrentPicIndex(index)
      setIsImgSliderOpen(true)
   }
   return (
      <StyledImageGridContainer>
         {postedPicturesPath.map((image, index) =>
            index === 0 ? (
               <FirstGridImage
                  onClick={() => setPicIndexAndOpenModal(index)}
                  key={index}
                  src={image == '' ? StockImage : image}
                  alt='Kép'
                  width={500}
                  height={500}
               />
            ) : (
               index < 4 &&
               (index === 3 ? (
                  <OverlayedContainer onClick={() => setPicIndexAndOpenModal(index)} key={index}>
                     <StyledImage src={image == '' ? StockImage : image} alt='Kép' width={500} height={500} />
                     <OverlayedContent>+{postedPicturesPath.length - index - 1}</OverlayedContent>
                  </OverlayedContainer>
               ) : (
                  <StyledImage
                     onClick={() => setPicIndexAndOpenModal(index)}
                     key={index}
                     src={image == '' ? StockImage : image}
                     alt='Kép'
                     width={500}
                     height={500}
                  />
               ))
            )
         )}
      </StyledImageGridContainer>
   )
}

export default ImageContainer
