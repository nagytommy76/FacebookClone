import React, { useRef, useState, useEffect } from 'react'
import type { IPost } from '../Types'
import type { IPostComment } from './Like/Types'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FooterSectionStyle, BodyDescriptionSection } from './Styles'

import ImageContainer from './Includes/ImageContainer'
import CommentButton from './AddComment/CommentButton'
import Like from './Like/Like'
import AddComment from './AddComment/AddComment'
import SingleComment from './SingleComment/SingleComment'

const SinglePost: React.FC<{
   singlePost: IPost
   children: React.ReactNode
}> = ({ singlePost, children }) => {
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
            <Like postLikes={singlePost.likes} postId={singlePost._id}>
               <CommentButton commentRef={commentRef} />
            </Like>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {currentComments.map((comment) => (
               <SingleComment key={comment._id} comment={comment} />
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
