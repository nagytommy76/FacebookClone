import dynamic from 'next/dynamic'
import type { ICommentAnswers, IPostComment } from '@/src/types/LikeTypes'

import {
   StyledCommentContainer,
   StyledListElement,
   StyledRightSide,
   StyledRightContainer,
} from './Styles/ContainerStyles'

import LeftSideSkeleton from '@/Skeletons/Comments/Includes/LeftSideSkeleton'
import BodySkeleton from '@/src/skeletons/Comments/Includes/BodySkeleton'
import FooterSkeleton from '@/src/skeletons/Comments/Includes/FooterSkeleton'
import SkeletonImg from '@/assets/facebook-profile.jpg'

import Options from './Includes/Options/Options'
import ErrorSnackbar from './Includes/Error/ErrorSnackbar'
const LeftSide = dynamic(() => import('./Includes/LeftImageSide/LeftImage'), {
   loading: () => <LeftSideSkeleton />,
})
const CommentBody = dynamic(() => import('./Includes/CommentBody/CommentBody'), {
   loading: () => <BodySkeleton />,
})
const CommentFooter = dynamic(() => import('./Includes/CommentFooter/CommentFooter'), {
   loading: () => <FooterSkeleton />,
})
const CommentImage = dynamic(() => import('./Includes/CommentImage/CommentImage'))

const BaseAnswerAndComment: React.FC<{
   commentId?: string
   answer: ICommentAnswers | IPostComment
   children: React.ReactNode
   AddComment: React.ReactNode
   postId: string
   isUpdate: boolean
   isError: boolean
   isChildComment: boolean
   isChild?: boolean
   handleSetOpen: () => void
   handleSetOpenForUpdate: (commentText: string) => void
}> = ({
   commentId,
   answer,
   children,
   AddComment,
   postId,
   isError,
   isUpdate,
   isChild = false,
   isChildComment = false,
   handleSetOpen,
   handleSetOpenForUpdate,
}) => {
   // Az isChildComment-et fel tudom használni, hogy eldöntsem answer-ről van-e szó, és úgy tudom módosítani
   return (
      <>
         <StyledCommentContainer isChildComment={isChildComment}>
            <StyledListElement>
               <LeftSide
                  isChild={isChild}
                  profilePicturePath={
                     answer.userId?.userDetails.profilePicturePath[0].path || SkeletonImg.src
                  }
               />
               <StyledRightSide>
                  <StyledRightContainer>
                     <CommentBody
                        commentId={commentId}
                        answerId={answer._id}
                        comment={answer.comment}
                        likes={answer.likes}
                        postId={postId}
                        isChildComment={isChildComment}
                     />
                     <Options
                        handleSetAnswerOpenForUpdate={() => handleSetOpenForUpdate(answer.comment)}
                        isChildComment={isChildComment}
                        answeredUserId={answer.userId?._id}
                        answerId={answer._id}
                        commentId={commentId}
                     />
                  </StyledRightContainer>
                  <CommentFooter
                     answerId={answer._id}
                     answeredAt={answer.answeredAt}
                     handleSetAnswerOpen={handleSetOpen}
                     likes={answer.likes}
                     postId={postId}
                     isChildComment={isChildComment}
                  />
                  <CommentImage
                     answerId={answer._id}
                     isAnswer={isChildComment}
                     commentImage={answer.commentImage}
                     isUpdateActive={isUpdate}
                  />
                  {AddComment}
                  {children}
               </StyledRightSide>
            </StyledListElement>
         </StyledCommentContainer>
         <ErrorSnackbar isError={isError} />
      </>
   )
}

export default BaseAnswerAndComment
