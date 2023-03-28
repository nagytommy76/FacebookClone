import { styled } from '@mui/system'

export const StyledTabContainer = styled('div')(({ theme }) => ({
   maxWidth: '100%',
   minHeight: '40%',
   display: 'flex',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
   },
}))

// WorkSchool --------------------------
export const WorkSchoolSection = styled('section')({
   width: '100%',
   minHeight: '400px',
   display: 'flex',
   flexDirection: 'column',
})

export const WorkSchoolItems = styled('div')({
   width: '100%',
   height: '160px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',
   alignItems: 'flex-start',
})
