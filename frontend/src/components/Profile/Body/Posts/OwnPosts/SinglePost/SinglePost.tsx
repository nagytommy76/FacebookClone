import React from 'react'

import Paper from '@mui/material/Paper'
import type { IOwnPost } from '../Types'

const SinglePost: React.FC<{ singlePost: IOwnPost }> = ({ singlePost }) => {
   return (
      <Paper sx={{ margin: '1rem 0', padding: '1rem .5rem', minHeight: '100px' }}>
         <h1>{singlePost.description}</h1>
      </Paper>
   )
}

export default SinglePost
