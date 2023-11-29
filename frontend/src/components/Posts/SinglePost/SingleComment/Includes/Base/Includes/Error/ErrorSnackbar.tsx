import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const ErrorSnackbar: React.FC<{ isError: boolean }> = ({ isError }) => {
   return (
      <Snackbar open={isError} autoHideDuration={7500}>
         <Alert severity='error' variant='filled'>
            Sajnos hiba történt! Kérlek próbáld újra!
         </Alert>
      </Snackbar>
   )
}

export default ErrorSnackbar
