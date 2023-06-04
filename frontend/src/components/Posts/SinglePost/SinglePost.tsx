import React, { useRef, useState, useEffect, useContext } from 'react'
import type { IPostComment } from './Like/Types'
import CommentContextProvider from './SingleComment/Context/CommentContext'
import { PostContext } from '../../MainPage/Context/PostContextProvider'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FooterSectionStyle, ButtonGroupStyle, BodyDescriptionSection } from './Styles'

import ImageContainer from './Includes/ImageContainer'
import CommentButton from './AddComment/CommentButton'
import Like from './Like/Like'
import AddComment from './AddComment/AddComment'
import SingleComment from './SingleComment/SingleComment'

const SinglePost: React.FC<{
   children: React.ReactNode
}> = ({ children }) => {
   const {
      postsReducer: { singlePost },
   } = useContext(PostContext)
   const commentRef = useRef(null)
   // Létrehozok egy state-et, hogy ebben tároljam a commenteket és tudjam módosítani (hozzáadni) a child komponensekben
   const [currentComments, setCurrentComments] = useState<IPostComment[]>([])
   useEffect(() => {
      setCurrentComments(singlePost.comments)
   }, [singlePost.comments])

   return (
      <Paper sx={{ margin: '1rem 0', pb: '.3rem', minHeight: '100px' }}>
         {children}
         <BodyDescriptionSection>
            <Typography variant='subtitle1'>{singlePost.description}</Typography>
         </BodyDescriptionSection>
         <ImageContainer singlePost={singlePost} />
         <FooterSectionStyle>
            <ButtonGroupStyle>
               <Like postLikes={singlePost.likes} postId={singlePost._id}>
                  <CommentButton commentRef={commentRef} />
               </Like>
            </ButtonGroupStyle>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {currentComments.map((comment) => (
               <CommentContextProvider key={comment._id}>
                  <SingleComment postId={singlePost._id} comment={comment} />
               </CommentContextProvider>
            ))}
            <AddComment
               setCurrentComments={setCurrentComments}
               postId={singlePost._id}
               reference={commentRef}
            />
         </FooterSectionStyle>
      </Paper>
   )
}

export default SinglePost
