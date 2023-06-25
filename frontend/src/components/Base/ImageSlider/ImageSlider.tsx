import { StyledModalContainer, StyledImageContainer, CloseIconStyle, StyledModalImage } from './Styles'
import Modal from '@mui/material/Modal'
import LeftArrow from './Includes/LeftArrow'
import RightArrow from './Includes/RightArrow'

const ImageSlider: React.FC<{
   isImgSliderOpen: boolean
   postedPicturesPath: string[]
   currentPicIndex: number
   setIsImgSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
   nextImage: () => void
   previousImage: () => void
}> = ({
   isImgSliderOpen,
   postedPicturesPath,
   currentPicIndex,
   setIsImgSliderOpen,
   nextImage,
   previousImage,
}) => {
   return (
      <Modal open={isImgSliderOpen}>
         <StyledModalContainer>
            <CloseIconStyle onClick={() => setIsImgSliderOpen(false)} />
            <StyledImageContainer>
               <StyledModalImage
                  sizes='(max-width: 400px) 400px, (max-width: 1200px) 1200px, 100vw'
                  fill
                  src={postedPicturesPath[currentPicIndex]}
                  alt=''
               />
            </StyledImageContainer>
            <LeftArrow previousImage={previousImage} />
            <RightArrow nextImage={nextImage} />
         </StyledModalContainer>
      </Modal>
   )
}

export default ImageSlider
