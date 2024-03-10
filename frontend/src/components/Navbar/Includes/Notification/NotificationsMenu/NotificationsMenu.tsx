import { useContext, SetStateAction } from 'react'
import Link from 'next/link'
import { NotificationsContext } from '../Context/NotificationContextProvider'

import useSetActiveNotifications from '../Hooks/useSetActiveNotifications'

import { StyledImage, StyledMenuItem, StyledIsActive, StyledTextArea, StyledMenuContainer } from './Style'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'

import RemoveNotification from '../Includes/RemoveNotification'
import TimeAgo from '../Includes/TimeAgo'
import NotificationText from '../Includes/NotificationText'

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
               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
               <TransitionGroup>
                  {notifications.map((notification) => (
                     <Collapse timeout={100} key={notification._id}>
                        <StyledMenuContainer>
                           <StyledMenuItem sx={{ maxWidth: '400px', marginBottom: 2 }}>
                              <StyledImage
                                 src={notification.userDetails.profilePicture}
                                 alt='Profile IMG'
                                 height={65}
                                 width={65}
                              />
                              <Link href={`#${notification.data?.postId}`}>
                                 <StyledTextArea
                                    onClick={() =>
                                       handleSetInactiveAndClose(notification._id, notification.isRead)
                                    }
                                 >
                                    <Typography variant='h6' gutterBottom>
                                       {notification.userDetails.firstName}{' '}
                                       {notification.userDetails.sureName}
                                    </Typography>
                                    <NotificationText notificationTypes={notification.notificationType} />
                                    <Typography variant='caption' noWrap sx={{ width: '280px' }}>
                                       {notification.data?.description}
                                    </Typography>
                                    <TimeAgo createdAt={notification.createdAt} />
                                 </StyledTextArea>
                              </Link>
                              <StyledIsActive isRead={notification.isRead} />
                           </StyledMenuItem>
                           <RemoveNotification notificationId={notification._id} />
                        </StyledMenuContainer>
                     </Collapse>
                  ))}
               </TransitionGroup>
            </Menu>
         )}
      </>
   )
}

export default NotificationsMenu
