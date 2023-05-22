import React, { useState } from 'react'
import type { IPost } from '../Types'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FooterSectionStyle, BodyDescriptionSection } from './Styles'

import ImageContainer from './Includes/ImageContainer'
import CommentButton from './Comment/CommentButton'
import Comment from './Comment/Comment'
import Like from './Like/Like'

const SinglePost: React.FC<{
   singlePost: IPost
   children: React.ReactNode
}> = ({ singlePost, children }) => {
   const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

   return (
      <Paper sx={{ margin: '1rem 0', pb: '1rem', minHeight: '100px' }}>
         {children}
         <BodyDescriptionSection>
            <Typography variant='subtitle1'>{singlePost.description}</Typography>
         </BodyDescriptionSection>
         <ImageContainer singlePost={singlePost} />
         <FooterSectionStyle>
            <Like postLikes={singlePost.likes} postId={singlePost._id}>
               <CommentButton setIsCollapsed={setIsCollapsed} />
            </Like>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Comment isCollapsed={isCollapsed} />
         </FooterSectionStyle>
      </Paper>
   )
}

export default SinglePost
