import React from 'react'
import Image from 'next/image'

import Paper from '@mui/material/Paper'
import type { IOwnPost } from '../Types'

import { StyledImageGridContainer, StyledImage, FirstGridImage } from './Styles'

const SinglePost: React.FC<{ singlePost: IOwnPost }> = ({ singlePost }) => {
   return (
      <Paper sx={{ margin: '1rem 0', padding: '1rem .5rem', minHeight: '100px' }}>
         <p>
            {singlePost.userId.firstName} {singlePost.userId.sureName}
         </p>
         <p>{singlePost.userId.createdAt}</p>
         <h1>{singlePost.description}</h1>
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
      </Paper>
   )
}

export default SinglePost
