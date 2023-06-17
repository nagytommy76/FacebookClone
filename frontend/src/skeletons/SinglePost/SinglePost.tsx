import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

import {
   StyledPostHeadSkeleton,
   StyledFlexContainer,
   BodySectionPlaceholderStyle,
   LikeAndCommentSection,
   StyledAddLikeComment,
} from './Style'

const SinglePost = () => {
   return (
      <Paper sx={{ margin: '1rem 0', p: '1rem', minHeight: '100px' }}>
         <StyledPostHeadSkeleton>
            <StyledFlexContainer>
               <Skeleton variant='circular' width={50} height={50} />
               <span>
                  <Skeleton animation='wave' height={20} width={180} />
                  <Skeleton animation='wave' height={20} width={180} />
               </span>
            </StyledFlexContainer>
         </StyledPostHeadSkeleton>
         <BodySectionPlaceholderStyle />
         {/* <Divider /> */}
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
