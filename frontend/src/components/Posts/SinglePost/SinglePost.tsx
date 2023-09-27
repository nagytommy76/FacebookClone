import React, { useRef, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import { PostContext } from '../../MainPage/Context/PostContextProvider'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import {
   FooterSectionStyle,
   ButtonGroupStyle,
   BodyDescriptionSection,
   LikeAndCommentContainer,
} from './Styles'

const ImageSlideComponent = dynamic(() => import('./Includes/ImageSlide/ImageSlide'))
const ReactionsContainer = dynamic(
   () => import('./SingleComment/Includes/Reatcions/Container/ReactionsContainer')
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
      postsReducer: { singlePost },
   } = useContext(PostContext)
   const commentRef = useRef(null)
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

   return (
      <>
         <Paper sx={{ margin: '1rem 0', pb: '.3rem', minHeight: '100px' }}>
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
                  {singlePost.comments.length > 0 && <p>{singlePost.comments.length} hozzászólás</p>}
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
         <CommentsDialog
            commentRef={commentRef}
            isDialogOpen={isDialogOpen}
            onCloseFn={() => setIsDialogOpen(false)}
            postId={singlePost._id}
         >
            {children}
         </CommentsDialog>
      </>
   )
}

export default SinglePost
