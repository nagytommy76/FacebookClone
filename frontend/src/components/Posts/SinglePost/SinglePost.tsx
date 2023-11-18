import React, { useRef, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import { PostContext } from '../../MainPage/Context/PostContextProvider'
import AllCommentContextProvider from '@/src/components/Posts/Context/AllCommentsContext'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import {
   FooterSectionStyle,
   ButtonGroupStyle,
   BodyDescriptionSection,
   LikeAndCommentContainer,
   CommentsParagraph,
} from './Styles'

import ReactionsSkeleton from '@/Skeletons/Comments/Includes/ReactionsSkeleton'
import ImageSlideSkeleton from '@/Skeletons/SinglePost/ImageSlide'

const ImageSlideComponent = dynamic(() => import('./Includes/ImageSlide/ImageSlide'), {
   loading: () => <ImageSlideSkeleton />,
})
const ReactionsContainer = dynamic(
   () => import('./SingleComment/Includes/Reatcions/Container/ReactionsContainer'),
   { loading: () => <ReactionsSkeleton /> }
)
const CommentsDialog = dynamic(() => import('./SingleComment/Includes/CommentDialog/CommentDialog'))

import CommentButton from './AddComment/CommentButton'
import Like from './Like/Like'

const SinglePost: React.FC<{
   children: React.ReactNode
   CommentsComponent?: React.ReactNode
   isTextFieldActive?: boolean
}> = ({ children, CommentsComponent, isTextFieldActive = false }) => {
   const {
      postsReducer: { singlePost, commentsLength },
   } = useContext(PostContext)
   const commentRef = useRef<HTMLTextAreaElement | undefined>()
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

   const handleOpenDialog = () => {
      if (!isTextFieldActive) setIsDialogOpen(true)
   }

   return (
      <>
         <Paper sx={{ margin: '1rem 0', pb: '.3rem', minHeight: '100px', position: 'relative' }}>
            {children}
            <BodyDescriptionSection>
               <Typography variant='subtitle1'>{singlePost.description}</Typography>
            </BodyDescriptionSection>
            {singlePost.postedPicturesPath && singlePost.postedPicturesPath.length > 0 && (
               <ImageSlideComponent postedPicturesPath={singlePost.postedPicturesPath} />
            )}
            <FooterSectionStyle>
               <LikeAndCommentContainer>
                  {singlePost.likes.length > 0 && (
                     <ReactionsContainer likes={singlePost.likes} postId={singlePost._id} />
                  )}
                  {commentsLength > 0 && (
                     <CommentsParagraph onClick={handleOpenDialog}>
                        {commentsLength} hozzászólás
                     </CommentsParagraph>
                  )}
               </LikeAndCommentContainer>
               <Divider sx={{ mt: 1, mb: 1 }} />
               <ButtonGroupStyle>
                  <Like commentId='' postLikes={singlePost.likes} postId={singlePost._id}>
                     <CommentButton
                        isTextFieldActive={isTextFieldActive}
                        handleOpenFn={() => setIsDialogOpen(true)}
                        commentRef={commentRef}
                     />
                  </Like>
               </ButtonGroupStyle>
               {CommentsComponent}
            </FooterSectionStyle>
         </Paper>
         <AllCommentContextProvider>
            <CommentsDialog
               commentRef={commentRef}
               isDialogOpen={isDialogOpen}
               onCloseFn={() => setIsDialogOpen(false)}
            >
               {children}
            </CommentsDialog>
         </AllCommentContextProvider>
      </>
   )
}

export default SinglePost
