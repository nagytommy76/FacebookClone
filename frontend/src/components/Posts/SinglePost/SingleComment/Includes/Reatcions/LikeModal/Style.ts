import { styled } from '@mui/material'

import Paper from '@mui/material/Paper'

export const StyledModalPaper = styled(Paper)({
   minWidth: 400,
   minHeight: 400,
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   borderRadius: 15,
})
