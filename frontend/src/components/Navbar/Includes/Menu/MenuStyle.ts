import { styled } from '@mui/material/styles'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

export const CustomIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
   width: 100,
   borderRadius: 10,
   color: theme.palette.warning.main,
}))
