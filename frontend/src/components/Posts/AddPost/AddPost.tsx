import dynamic from 'next/dynamic'
import ProfileImage from '../../../../public/sajat.jpg'

import usePostMutate from './AddDialog/Hooks/usePostMutate'
import useSnack from './Hooks/useSnack'
import useDialog from './Hooks/useDialog'

import { AddPostStyle, CustomAddPostButton, CustomNextImage } from './AddPostStyle'

const AddPostDialog = dynamic(() => import('./AddDialog/AddDialog'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})
const InformSnackbar = dynamic(() => import('./Includes/InformSnackbar'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})

const AddPost = () => {
   const {
      addDialogOpen,
      postDescription,
      uploadedPictures,
      setPostDescription,
      setUploadedPictures,
      handleDialogCloseOnSuccess,
      handleDialogClickOpen,
      handleDialogClose,
   } = useDialog()
   const { handleSnackClose, handleSnackOpenIfSuccess, isSnackOpen } = useSnack()
   const { isLoading, postMutate } = usePostMutate(
      postDescription,
      uploadedPictures,
      handleSnackOpenIfSuccess,
      handleDialogCloseOnSuccess
   )

   return (
      <>
         <AddPostStyle>
            {/* Ez itt majd dinamikus lesz */}
            <CustomNextImage src={ProfileImage} alt='Sajat kép' />
            <CustomAddPostButton onClick={handleDialogClickOpen} disableRipple variant='text' color='primary'>
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
            handleCloseAddDialog={handleDialogClose}
         />
         <InformSnackbar
            handleClose={handleSnackClose}
            message={isSnackOpen.msg}
            isOpen={isSnackOpen.isOpen}
         />
      </>
   )
}

export default AddPost
