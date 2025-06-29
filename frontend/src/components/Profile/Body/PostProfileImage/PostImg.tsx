import { useState } from 'react'
import ImageSlider from '@/Base/ImageSlider/ImageSlider'
import useGetPostImg from './Hooks/useGetPostImg'
import useImageSlider from './Hooks/useImageSlider'

import Typography from '@mui/material/Typography'

import { GridImage, StyledImage } from './Styles'

export default function PostImg() {
   const postImages = useGetPostImg()
   const { imageSliderOpen, selectedImgUrl, onClickImage, setImageSliderOpen } = useImageSlider()

   return (
      <>
         <Typography variant='h4' align='center' gutterBottom>
            Poszt képek
         </Typography>
         <GridImage>
            {postImages &&
               postImages.map((post) => (
                  <>
                     {post.postedPicturesPath.length > 0 && (
                        <>
                           {post.postedPicturesPath.map((image, index) => {
                              return (
                                 <>
                                    <StyledImage
                                       key={index}
                                       src={image}
                                       alt={image}
                                       width={220}
                                       height={170}
                                       onClick={() => onClickImage(image)}
                                    />
                                 </>
                              )
                           })}
                        </>
                     )}
                  </>
               ))}
         </GridImage>
         <ImageSlider
            currentPicIndex={0}
            isImgSliderOpen={imageSliderOpen}
            postedPicturesPath={selectedImgUrl}
            nextImage={() => {}}
            previousImage={() => {}}
            setIsImgSliderOpen={setImageSliderOpen}
         />
      </>
   )
}
