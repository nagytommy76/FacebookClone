import dynamic from 'next/dynamic'
import { useAppSelector } from '../../../utils/redux/store'

import usePostMutate from './AddDialog/Hooks/usePostMutate'
import useSnack from './Hooks/useSnack'
import useDialog from './Hooks/useDialog'

import StockImage from '../../../assets/facebook-profile.jpg'
import { AddPostStyle, CustomAddPostButton, CustomNextImage } from './AddPostStyle'

const AddPostDialog = dynamic(() => import('./AddDialog/AddDialog'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})
const InformSnackbar = dynamic(() => import('./Includes/InformSnackbar'), {
   loading: () => <h1>Töltés, majd csinálni egy suspense-t</h1>,
})

const AddPost = () => {
   const profilePicture = useAppSelector((state) => state.auth.currentImage)
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
            {profilePicture ? (
               <CustomNextImage src={profilePicture.path} width={35} height={35} alt='Sajat kép' />
            ) : (
               <CustomNextImage src={StockImage} width={35} height={35} alt='Sajat kép' />
            )}
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
