import ImageSlider from '@/Base/ImageSlider/ImageSlider'
import useCommentImage from './Hooks/useCommentImage'

import { StyledCommentImg, StyledCommentImgContainer } from './Styles'
import RemoveImgBtn from './Includes/RemoveImgBtn'

const CommentImage: React.FC<{
   commentImage: string | null
   answerId: string
   isUpdateActive?: boolean
   isAnswer?: boolean
}> = ({ commentImage, answerId, isAnswer = false, isUpdateActive = false }) => {
   const { isImgSliderOpen, openImgSlide, setIsImgSliderOpen } = useCommentImage()

   return (
      <>
         <StyledCommentImgContainer>
            {commentImage && (
               <>
                  <StyledCommentImg
                     onClick={openImgSlide}
                     src={commentImage}
                     alt='included comment image'
                     width={300}
                     height={200}
                  />
                  <ImageSlider
                     currentPicIndex={0}
                     isImgSliderOpen={isImgSliderOpen}
                     postedPicturesPath={[commentImage]}
                     nextImage={() => {}}
                     previousImage={() => {}}
                     setIsImgSliderOpen={setIsImgSliderOpen}
                  />
               </>
            )}
            <RemoveImgBtn
               answerId={answerId}
               isAnswer={isAnswer}
               commentImage={commentImage}
               isUpdateActive={isUpdateActive}
            />
         </StyledCommentImgContainer>
      </>
   )
}

export default CommentImage
