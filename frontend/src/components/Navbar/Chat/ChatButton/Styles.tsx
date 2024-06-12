import Image from 'next/image'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'

import Menu from '@mui/material/Menu'

export const StyledButtonContainer = styled('div')({
   position: 'absolute',
   right: 25,
   bottom: 30,
})

export const ChatMenuContainer = styled(Menu)(({ theme }) => ({
   '& .MuiPaper-root': {
      width: '350px',
      minHeight: '550px',

      borderRadius: 6,
      padding: '12px',
      marginBottom: theme.spacing(15),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
         padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
         display: 'flex',
         flexDirection: 'row',

         height: '80px',
         borderRadius: 7,
      },
   },
}))

export const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      fontSize: 15,
   },
}))

export const StyledFab = styled(Fab)(({ theme }) => ({
   width: 60,
   height: 60,

   [theme.breakpoints.down('md')]: {
      width: 40,
      height: 40,
   },
}))

export const StyledFabImage = styled(Image)(({ theme }) => ({
   width: 50,
   height: 50,

   [theme.breakpoints.down('md')]: {
      width: 30,
      height: 30,
   },
}))
