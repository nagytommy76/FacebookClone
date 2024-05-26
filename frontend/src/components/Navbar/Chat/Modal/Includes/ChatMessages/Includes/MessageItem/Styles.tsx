import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const StyledTextContainer = styled('div', {
   shouldForwardProp: (prop) => prop !== 'isRightContent',
})<{ isRightContent: boolean }>(({ isRightContent, theme }) => ({
   width: '43%',
   alignSelf: isRightContent ? 'end' : 'start',
   marginBottom: 15,

   position: 'relative',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: 25,
   },
}))

export const StyledTextBoxHead = styled('span', {
   shouldForwardProp: (prop) => prop !== 'isRightContent',
})<{ isRightContent: boolean }>(({ isRightContent, theme }) => ({
   display: 'flex',
   alignItems: 'center',
   flexDirection: isRightContent ? 'row' : 'row-reverse',
   justifyContent: 'space-between',

   marginBottom: 10,
}))

export const StyledTextBoxContainer = styled('div', {
   shouldForwardProp: (prop) => prop !== 'isRightContent',
})<{ isRightContent: boolean }>(({ isRightContent, theme }) => ({
   display: 'flex',
   flexDirection: isRightContent ? 'row' : 'row-reverse',
   alignItems: 'center',
}))

export const StyledTextBox = styled(Paper, {
   shouldForwardProp: (prop) => prop !== 'isRightContent',
})<{ isRightContent: boolean }>(({ isRightContent, theme }) => ({
   width: '100%',
   padding: '.85rem',
   textAlign: 'justify',

   borderRadius: '25px',
   borderTopRightRadius: isRightContent ? 0 : '25px',
   borderTopLeftRadius: isRightContent ? '25px' : 0,

   [theme.breakpoints.down('md')]: {
      padding: '.7rem',
      fontSize: '.1rem',
   },
}))

export const StyledTypography = styled(Typography)(({ theme }) => ({
   fontWeight: 350,
   [theme.breakpoints.down('md')]: {
      fontSize: 11,
   },
}))
