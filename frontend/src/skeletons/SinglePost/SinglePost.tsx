import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'

const SinglePost = () => {
   return (
      <Paper sx={{ margin: '1rem 0', pb: '.3rem', minHeight: '100px' }}>
         <Skeleton animation='wave' height={40} width='80%' />
      </Paper>
   )
}

export default SinglePost
