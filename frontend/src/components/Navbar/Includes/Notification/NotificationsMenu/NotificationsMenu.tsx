import { useContext, SetStateAction } from 'react'
import Link from 'next/link'
import { NotificationsContext } from '../Context/NotificationContextProvider'

import useSetActiveNotifications from '../Hooks/useSetActiveNotifications'

import { StyledImage, StyledMenuItem, StyledIsActive, StyledTextArea } from './Style'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

import TimeAgo from '../Includes/TimeAgo'

const NotificationsMenu: React.FC<{
   anchorEl: HTMLElement | null
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
}> = ({ anchorEl, setAnchorEl }) => {
   const {
      notificationsReducer: { notifications },
   } = useContext(NotificationsContext)
   const open = Boolean(anchorEl)
   const handleClose = () => {
      setAnchorEl(null)
   }
   const { handleSetInactiveAndClose } = useSetActiveNotifications(handleClose)

   return (
      <>
         {notifications !== null && (
            <Menu
               anchorEl={anchorEl}
               id='notifications-menu'
               open={open}
               onClose={handleClose}
               onClick={handleClose}
               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
               {notifications.map((notification) => (
                  <Link key={notification._id} href={`#${notification.postData?.postId}`}>
                     <StyledMenuItem
                        key={notification._id}
                        onClick={() => handleSetInactiveAndClose(notification._id, notification.isRead)}
                        sx={{ maxWidth: '400px', marginBottom: 2 }}
                     >
                        <StyledImage
                           src={notification.userDetails.profilePicture}
                           alt='Profile IMG'
                           height={65}
                           width={65}
                        />
                        <StyledTextArea>
                           <Typography variant='h6' gutterBottom>
                              {notification.userDetails.firstName} {notification.userDetails.sureName}
                           </Typography>
                           <Typography variant='caption' gutterBottom>
                              Likeolta a bejegyzésedet:
                           </Typography>
                           <Typography variant='caption' noWrap sx={{ width: '280px' }}>
                              {notification.postData.description}
                           </Typography>
                           <TimeAgo createdAt={notification.createdAt} />
                        </StyledTextArea>
                        <StyledIsActive isRead={notification.isRead} />
                     </StyledMenuItem>
                  </Link>
               ))}
            </Menu>
         )}
      </>
   )
}

export default NotificationsMenu
