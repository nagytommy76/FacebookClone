import React from 'react'
import { styled } from '@mui/material'

import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

export const AddPostStyle = styled(Paper)({
   marginTop: 16,
   marginBottom: 16,
   height: '70px',
   padding: '0 1rem',

   display: 'flex',
   alignItems: 'center',
   justifyItems: 'center',
   justifyContent: 'space-between',
})

const AddPostSkeleton = () => {
   return (
      <AddPostStyle>
         <Skeleton variant='circular' animation='pulse' width={50} height={50} />
         <Skeleton variant='rounded' animation='pulse' sx={{ marginLeft: 1 }} width='95%' height={45} />
      </AddPostStyle>
   )
}

export default AddPostSkeleton
