import { styled } from '@mui/system'

// WorkSchool --------------------------
export const WorkSchoolSection = styled('section')({
   width: '99%',
   minHeight: '500px',
   marginLeft: 13,

   display: 'flex',
   flexDirection: 'column',
})

export const WorkSchoolItems = styled('div')({
   width: '100%',
   minHeight: '100px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',
   alignItems: 'flex-start',

   margin: '.3rem 0 3rem 0',
})

export const WorkSchoolInputContainer = styled('div')({
   margin: '1rem 0',
   width: '90%',

   display: 'grid',
   gap: '20px',
})
