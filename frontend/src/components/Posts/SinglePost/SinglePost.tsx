import React from 'react'
import type { IPost } from '../Types'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FooterSectionStyle, BodyDescriptionSection } from './Styles'

import PostHeader from './Includes/PostHeader/PostHeader'
import ImageContainer from './Includes/ImageContainer'
import Like from './Like/Like'

const SinglePost: React.FC<{ singlePost: IPost }> = ({ singlePost }) => {
   return (
      <Paper sx={{ margin: '1rem 0', pb: '1rem', minHeight: '100px' }}>
         <PostHeader userInfo={singlePost.userId} createdAt={singlePost.createdAt} />
         <BodyDescriptionSection>
            <Typography variant='subtitle1'>{singlePost.description}</Typography>
         </BodyDescriptionSection>
         <ImageContainer singlePost={singlePost} />
         <FooterSectionStyle>
            <Like postLikes={singlePost.likes} postId={singlePost._id} />
            <Divider sx={{ mt: 1, mb: 1 }} />
         </FooterSectionStyle>
      </Paper>
   )
}

export default SinglePost
