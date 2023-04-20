import React from 'react'
import moment from 'moment'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import type { IOwnPost } from '../Types'

import Like from './Includes/Like'

import { StyledImageGridContainer, StyledImage, FirstGridImage, PostHeaderStyle } from './Styles'

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
         <StyledImageGridContainer>
            {singlePost.postedPicturesPath !== null &&
               singlePost.postedPicturesPath.map((image, index) =>
                  index === 0 ? (
                     <FirstGridImage src={image} alt='Kép' width={500} height={500} />
                  ) : (
                     <StyledImage src={image} alt='Kép' width={500} height={500} />
                  )
               )}
         </StyledImageGridContainer>
         <Like />
      </Paper>
   )
}

export default SinglePost
