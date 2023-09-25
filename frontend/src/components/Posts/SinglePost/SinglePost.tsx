import React, { useRef, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import CommentContextProvider from './SingleComment/Context/CommentContext'
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

import Dialog from '@mui/material/Dialog'

const ImageSlideComponent = dynamic(() => import('./Includes/ImageSlide/ImageSlide'))
const ReactionsContainer = dynamic(
   () => import('./SingleComment/Includes/Reatcions/Container/ReactionsContainer')
)
import CommentButton from './AddComment/CommentButton'
import Like from './Like/Like'
import AddComment from './AddComment/AddComment'
import SingleComment from './SingleComment/SingleComment'

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
         <Dialog
            maxWidth='md'
            scroll='body'
            sx={{ width: '100%', margin: 'auto' }}
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
         >
            <div style={{ width: '800px', overflowX: 'hidden' }}>
               <SinglePost
                  isTextFieldActive={true}
                  CommentsComponent={
                     <>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        {singlePost.comments.map((comment) => (
                           <CommentContextProvider
                              key={comment._id}
                              singleComment={comment}
                              postId={singlePost._id}
                           >
                              <SingleComment />
                           </CommentContextProvider>
                        ))}
                        <AddComment postId={singlePost._id} reference={commentRef} />
                     </>
                  }
               >
                  {children}
               </SinglePost>
            </div>
         </Dialog>
      </>
   )
}

export default SinglePost
