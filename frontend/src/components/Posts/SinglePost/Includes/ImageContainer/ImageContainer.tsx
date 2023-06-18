import React from 'react'
import {
   StyledImageGridContainer,
   StyledImage,
   FirstGridImage,
   OverlayedContent,
   OverlayedContainer,
} from './Styles'
import StockImage from '@/assets/facebook-profile.jpg'

const ImageContainer: React.FC<{ postedPicturesPath: string[] }> = ({ postedPicturesPath }) => {
   return (
      <StyledImageGridContainer>
         {postedPicturesPath.map((image, index) =>
            index === 0 ? (
               <FirstGridImage
                  key={index}
                  src={image == '' ? StockImage : image}
                  alt='Kép'
                  width={500}
                  height={500}
               />
            ) : (
               index < 4 &&
               (index === 3 ? (
                  <OverlayedContainer>
                     <StyledImage
                        key={index}
                        src={image == '' ? StockImage : image}
                        alt='Kép'
                        width={500}
                        height={500}
                     />
                     <OverlayedContent>+{postedPicturesPath.length - index - 1}</OverlayedContent>
                  </OverlayedContainer>
               ) : (
                  <StyledImage
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
