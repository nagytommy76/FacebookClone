import { useContext } from 'react'
import ImageSlider from '@/Base/ImageSlider/ImageSlider'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import { GridImage, StyledImage } from './Styles'
import useImageSlider from './Hooks/useImageSlider'

import Typography from '@mui/material/Typography'

export default function ProfileImg() {
   const { imageSliderOpen, selectedImgUrl, onClickImage, setImageSliderOpen } = useImageSlider()
   const {
      profileReducer: {
         initialUserDataState: {
            userDetails: { profilePicturePath },
         },
      },
   } = useContext(ProfileContext)

   return (
      <>
         <Typography variant='h4' align='center' gutterBottom>
            Profil képek
         </Typography>
         <GridImage>
            {profilePicturePath.map((image) => (
               <StyledImage
                  key={image._id}
                  src={image.path}
                  alt={image.path}
                  width={200}
                  height={200}
                  onClick={() => onClickImage(image.path)}
               />
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
