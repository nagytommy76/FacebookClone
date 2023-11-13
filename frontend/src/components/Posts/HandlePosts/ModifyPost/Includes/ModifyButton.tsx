import useModifyPost from '../Hooks/useModifyPost'

import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import EditIcon from '@mui/icons-material/Edit'

const ModifyButton: React.FC<{ modifiedDescription: string; handleDialogCloseOnSuccess: () => void }> = ({
   modifiedDescription,
   handleDialogCloseOnSuccess,
}) => {
   const { updatePostMutate, isLoading } = useModifyPost({
      modifiedDescription,
      handleDialogCloseOnSuccess,
   })

   return (
      <DialogActions>
         <LoadingButton
            // disabled={isSendBtnDisabled}
            onClick={() => updatePostMutate()}
            loading={isLoading}
            loadingPosition='start'
            startIcon={<EditIcon />}
            fullWidth
            variant='contained'
            color='success'
         >
            Módosítás
         </LoadingButton>
      </DialogActions>
   )
}

export default ModifyButton
