import React from 'react'
import { StyledImageGridContainer, StyledImage, FirstGridImage } from '../Styles'
import { IPost } from '../../Types'
import StockImage from '../../../../assets/facebook-profile.jpg'

const ImageContainer: React.FC<{ singlePost: IPost }> = ({ singlePost }) => {
   return (
      <StyledImageGridContainer>
         {singlePost.postedPicturesPath?.length > 0 &&
            singlePost.postedPicturesPath.map((image, index) =>
               index === 0 ? (
                  <FirstGridImage
                     key={index}
                     src={image == '' ? StockImage : image}
                     alt='Kép'
                     width={500}
                     height={500}
                  />
               ) : (
                  <StyledImage
                     key={index}
                     src={image == '' ? StockImage : image}
                     alt='Kép'
                     width={500}
                     height={500}
                  />
               )
            )}
      </StyledImageGridContainer>
   )
}

export default ImageContainer
