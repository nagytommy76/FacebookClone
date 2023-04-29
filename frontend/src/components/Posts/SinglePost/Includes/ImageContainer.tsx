import React from 'react'
import { StyledImageGridContainer, StyledImage, FirstGridImage } from '../Styles'
import { IOwnPost } from '../../../Profile/Body/Posts/OwnPosts/Types'

const ImageContainer: React.FC<{ singlePost: IOwnPost }> = ({ singlePost }) => {
   return (
      <StyledImageGridContainer>
         {singlePost.postedPicturesPath !== null &&
            singlePost.postedPicturesPath.map((image, index) =>
               index === 0 ? (
                  <FirstGridImage key={index} src={image} alt='Kép' width={500} height={500} />
               ) : (
                  <StyledImage key={index} src={image} alt='Kép' width={500} height={500} />
               )
            )}
      </StyledImageGridContainer>
   )
}

export default ImageContainer
