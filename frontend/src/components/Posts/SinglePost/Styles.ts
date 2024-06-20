import { styled } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const StyledPaper = styled(Paper)(({ theme }) => ({
   margin: '1rem 0',
   paddingBottom: '.3rem',
   minHeight: '100px',
   position: 'relative',

   [theme.breakpoints.down('md')]: {
      margin: '1.5rem 0',
   },
}))

// Body section -----------------
export const BodyDescriptionSection = styled('div')(({ theme }) => ({
   padding: '.5rem 1rem 1rem 1rem',
   textAlign: 'justify',
   [theme.breakpoints.down('md')]: {
      textTransform: 'capitalize',
   },
}))

export const StyledTypography = styled(Typography)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      fontSize: '.8rem',
   },
}))

// "Footer" section

export const LikeAndCommentContainer = styled('div')(({ theme }) => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      marginLeft: '.3rem',
   },
}))

export const ButtonGroupStyle = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   gap: '2px',

   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}))

export const FooterSectionStyle = styled('footer')(({ theme }) => ({
   width: '100%',
   padding: '1rem 1rem .5rem 1rem',
   [theme.breakpoints.down('md')]: {
      paddingTop: '1rem',
      paddingLeft: '.2rem',
   },
}))

export const CommentsParagraph = styled('p')({
   transition: 'all .3s ease',
   cursor: 'pointer',
   '&:hover': {
      textDecoration: 'underline',
   },
})
