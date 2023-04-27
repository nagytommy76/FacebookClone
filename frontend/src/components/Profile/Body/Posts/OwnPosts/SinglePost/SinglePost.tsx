import React from 'react'
import moment from 'moment'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import type { IOwnPost } from '../Types'
import { FooterSectionStyle } from './Styles'

import ImageContainer from './Includes/ImageContainer'
import Like from './Like/Like'

import { PostHeaderStyle } from './Styles'

const SinglePost: React.FC<{ singlePost: IOwnPost }> = ({ singlePost }) => {
   return (
      <Paper sx={{ margin: '1rem 0', pb: '1rem', minHeight: '100px' }}>
         <PostHeaderStyle>
            <Typography variant='h6'>
               {singlePost.userId.firstName} {singlePost.userId.sureName}
            </Typography>
            <p>{moment(singlePost.createdAt).format('YYYY MMMM D dddd, kk:mm')}</p>
            <Typography variant='body1'>{singlePost.description}</Typography>
         </PostHeaderStyle>
         <ImageContainer singlePost={singlePost} />
         <FooterSectionStyle>
            <Like postLikes={singlePost.likes} postId={singlePost._id} />
            <Divider sx={{ mt: 1, mb: 1 }} />
         </FooterSectionStyle>
      </Paper>
   )
}

export default SinglePost
