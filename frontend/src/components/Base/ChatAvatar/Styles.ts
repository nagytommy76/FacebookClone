import { styled } from '@mui/material'
import Badge from '@mui/material/Badge'

export const StyledBadge = styled(Badge, {
   shouldForwardProp: (prop) =>
      prop !== 'isRead' && prop !== 'topPosition' && prop !== 'rightPosition' && prop !== 'bottomPosition',
})(({ theme }) => ({
   '& .MuiBadge-badge': {
      backgroundColor: '#09F905',
      color: '#44b700',
      boxShadow: `none`,
      '&::after': {
         position: 'absolute',
         top: -1,
         left: -1,
         width: '100%',
         height: '100%',
         borderRadius: '50%',
         animation: 'ripple 1.2s infinite ease-in-out',
         border: '1px solid #09F905',
         content: '""',
      },
   },
   '@keyframes ripple': {
      '0%': {
         transform: 'scale(.6)',
         opacity: 1,
      },
      '100%': {
         transform: 'scale(2.3)',
         opacity: 0,
      },
   },
}))
