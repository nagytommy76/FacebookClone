import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

import PostHeaderSkeleton from './PostHeader'

import { BodySectionStyle, LikeAndCommentSection, StyledAddLikeComment } from './Style'

function CalculateRandomWidth() {
   return Math.round(Math.random() * 100)
}

const SinglePost = () => {
   return (
      <Paper sx={{ margin: '1rem 0', p: '1rem' }}>
         <PostHeaderSkeleton />
         <BodySectionStyle>
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
            <Skeleton variant='text' width={`${CalculateRandomWidth()}%`} height={20} />
         </BodySectionStyle>
         <LikeAndCommentSection>
            <Skeleton animation='wave' height={30} width={50} />
            <Skeleton animation='wave' height={30} width={80} />
         </LikeAndCommentSection>
         <Divider />
         <StyledAddLikeComment>
            <Skeleton animation='wave' height={50} width={170} />
            <Skeleton animation='wave' height={50} width={170} />
         </StyledAddLikeComment>
         <Divider />
      </Paper>
   )
}

export default SinglePost
