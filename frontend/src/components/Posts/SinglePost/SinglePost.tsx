import React, { useRef, useContext } from 'react'
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

const ImageSlideComponent = dynamic(() => import('./Includes/ImageSlide/ImageSlide'))
import CommentButton from './AddComment/CommentButton'
import Like from './Like/Like'
import AddComment from './AddComment/AddComment'
import SingleComment from './SingleComment/SingleComment'
import Reactions from './SingleComment/Includes/Reatcions/Reactions'

const SinglePost: React.FC<{
   children: React.ReactNode
}> = ({ children }) => {
   const {
      postsReducer: { singlePost },
   } = useContext(PostContext)
   const commentRef = useRef(null)

   return (
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
                  <Reactions isPostReactions={true} postId={singlePost._id} likes={singlePost.likes} />
               )}
               {singlePost.comments.length > 0 && <p>{singlePost.comments.length} hozzászólás</p>}
            </LikeAndCommentContainer>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ButtonGroupStyle>
               <Like postLikes={singlePost.likes} postId={singlePost._id}>
                  <CommentButton commentRef={commentRef} />
               </Like>
            </ButtonGroupStyle>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {singlePost.comments.map((comment) => (
               <CommentContextProvider key={comment._id} singleComment={comment} postId={singlePost._id}>
                  <SingleComment />
               </CommentContextProvider>
            ))}
            <AddComment postId={singlePost._id} reference={commentRef} />
         </FooterSectionStyle>
      </Paper>
   )
}

export default SinglePost
