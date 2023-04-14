import { useState } from 'react'
import dynamic from 'next/dynamic'
import ProfileImage from '../../../../../../public/sajat.jpg'
import usePostMutate from './AddDialog/Hooks/usePostMutate'

import { AddPostStyle, CustomAddPostButton, CustomNextImage } from './AddPostStyle'

const AddPostDialog = dynamic(() => import('./AddDialog/AddDialog'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})
const InformSnackbar = dynamic(() => import('./AddDialog/Includes/InformSnackbar'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})

const AddPost = () => {
   const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false)
   const [postDescription, setPostDescription] = useState<string>('')
   const [isSnackOpen, setIsSnackOpen] = useState<{ isOpen: boolean; msg: string }>({
      isOpen: false,
      msg: '',
   })
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)

   const handleSnackOpen = () => {
      setIsSnackOpen((prevValue) => {
         return {
            ...prevValue,
            isOpen: true,
         }
      })
   }
   const handleSnackClose = () => {
      setIsSnackOpen((prevValue) => {
         return {
            ...prevValue,
            isOpen: false,
         }
      })
   }

   const handleClickOpen = () => {
      setAddDialogOpen(true)
   }
   const handleClose = () => {
      setAddDialogOpen(false)
   }
   const { isLoading, postMutate } = usePostMutate(postDescription, uploadedPictures, handleClose)

   return (
      <>
         <AddPostStyle>
            {/* Ez itt majd dinamikus lesz */}
            <CustomNextImage src={ProfileImage} alt='Sajat kép' />
            <CustomAddPostButton onClick={handleClickOpen} disableRipple variant='text' color='primary'>
               Mi jár a fejedben?
            </CustomAddPostButton>
         </AddPostStyle>
         <AddPostDialog
            isLoading={isLoading}
            postDescription={postDescription}
            openAddDialog={addDialogOpen}
            uploadedPictures={uploadedPictures}
            postMutate={postMutate}
            setPostDescription={setPostDescription}
            setUploadedPictures={setUploadedPictures}
            handleCloseAddDialog={handleClose}
         />
         <InformSnackbar handleClose={handleSnackClose} isOpen={isSnackOpen.isOpen} />
      </>
   )
}

export default AddPost
