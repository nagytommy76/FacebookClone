import Image from 'next/image'
import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'

export const StyledCommentContainer = styled('div')({
   margin: '.75rem 0',
   display: 'flex',
   flexDirection: 'column',
})

// Picture style --------------------------------------------
export const StyledProfileImage = styled(Image)({
   position: 'absolute',
   left: 0,
   top: 0,
   marginRight: 8,
   height: 38,
   width: 38,
   borderRadius: 50,
})

export const StyledListElement = styled('div')({
   position: 'relative',
   paddingLeft: 45,
   listStyle: 'none',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledCommentPaper = styled(Paper)(({ theme }) => ({
   width: 'max-content',
   maxWidth: '90%',
   padding: 12,
   borderRadius: 20,
   backgroundColor: 'rgba(100,100,100, 0.35)',

   position: 'relative',
}))

// ICONS ----------------------------------------
export const IconStackContainerStyle = styled('span')({
   minWidth: 35,
   minHeight: 25,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignContent: 'space-around',
})
