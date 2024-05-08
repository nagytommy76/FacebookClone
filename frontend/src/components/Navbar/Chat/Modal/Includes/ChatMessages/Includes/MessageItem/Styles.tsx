import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

export const StyledTextContainer = styled('div', {
   shouldForwardProp: (prop) => prop !== 'isRightContent',
})<{ isRightContent: boolean }>(({ isRightContent, theme }) => ({
   width: '43%',
   alignSelf: isRightContent ? 'end' : 'start',
   marginBottom: 15,
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
   flexDirection: 'row',
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
}))
