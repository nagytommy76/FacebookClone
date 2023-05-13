import { styled } from '@mui/material'
export const StyledImageInputField = styled('input')({
   opacity: 0,
   width: 0.1,
   height: 0.1,
   position: 'absolute',
})

export const StyledLabelAsButton = styled('label')(({ theme }) => ({
   position: 'relative',
   width: '210px',
   height: '45px',
   borderRadius: '5px',

   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   background: theme.palette.info.main,
   boxShadow: '0 4px 7px rgba(0,0,0,0.4)',
   color: theme.palette.text.primary,

   cursor: 'pointer',
   transition: 'box-shadow .2s ease',

   ['&:hover']: {
      boxShadow: '0 8px 14px rgba(0,0,0,0.4)',
   },
}))
