import { useState } from 'react'
import dynamic from 'next/dynamic'
import ProfileImage from '../../../../../../public/sajat.jpg'

import { AddPostStyle, CustomAddPostButton, CustomNextImage } from './AddPostStyle'

const AddPostDialog = dynamic(() => import('./AddDialog/AddDialog'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})

const AddPost = () => {
   const [open, setOpen] = useState<boolean>(false)

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   return (
      <>
         <AddPostStyle>
            {/* Ez itt majd dinamikus lesz */}
            <CustomNextImage src={ProfileImage} alt='Sajat kép' />
            <CustomAddPostButton onClick={handleClickOpen} disableRipple variant='text' color='primary'>
               Mi jár a fejedben?
            </CustomAddPostButton>
         </AddPostStyle>
         <AddPostDialog handleCloseAddDialog={handleClose} openAddDialog={open} />
      </>
   )
}

export default AddPost
