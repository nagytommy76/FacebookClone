import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const LikeIconStyle = styled(Paper)({
   minWidth: 40,
   display: 'flex',
   justifyContent: 'space-between',

   borderRadius: 20,
   padding: '.1rem .3rem',
   position: 'absolute',
   right: 0,
   bottom: -10,
   fontSize: 13,

   cursor: 'pointer',
})

// ICONS --------------

export const IconStackStyle = styled('span')({
   margin: '.3rem 0',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
})

export const LikeLengthStyle = styled(Typography)({
   marginLeft: 5,
})
