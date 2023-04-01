import React from 'react'

import { AddPostStyle, CustomAddPostButton } from './AddPostStyle'

const AddPost = () => {
   return (
      <AddPostStyle>
         <CustomAddPostButton variant='text' color='primary'>
            Mi jár a fejedben?
         </CustomAddPostButton>
      </AddPostStyle>
   )
}

export default AddPost
