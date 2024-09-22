import { useContext, SetStateAction } from 'react'
import Link from 'next/link'
import { NotificationsContext } from '../Context/NotificationContextProvider'

import useSetActiveNotifications from '../Hooks/useSetActiveNotifications'

import { StyledImage, StyledMenuItem, StyledTextArea, StyledMenuContainer } from './Style'
import { StyledIsActive } from '@/styles/BaseStyles'
import Typography from '@mui/material/Typography'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'

import RemoveNotification from '../Includes/RemoveNotification'
import TimeAgo from '../Includes/TimeAgo'
import NotificationText from '../Includes/NotificationText'
import BaseMenu from './Includes/BaseMenu'
import EmptyNotification from './Includes/EmptyNotification'

const NotificationsMenu: React.FC<{
   anchorEl: HTMLElement | null
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
}> = ({ anchorEl, setAnchorEl }) => {
   const {
      notificationsReducer: { notifications },
   } = useContext(NotificationsContext)
   const handleClose = () => {
      setAnchorEl(null)
   }
   const { handleSetInactiveAndClose } = useSetActiveNotifications(handleClose)

   return (
      <>
         {notifications === null ? (
            <EmptyNotification anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
         ) : (
            <BaseMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
               <TransitionGroup>
                  {notifications.map((notification) => (
                     <Collapse timeout={100} key={notification._id}>
                        <StyledMenuContainer>
                           <StyledMenuItem>
                              <StyledImage
                                 src={notification.userDetails.profilePicture}
                                 alt='Profile IMG'
                                 height={65}
                                 width={65}
                              />
                              <Link href={`#${notification.data?.id}`}>
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
                              <StyledIsActive
                                 topPosition='unset'
                                 bottomPosition='10px'
                                 rightPosition='10px'
                                 width='12px'
                                 height='12px'
                                 isRead={notification.isRead}
                              />
                           </StyledMenuItem>
                           <RemoveNotification notificationId={notification._id} />
                        </StyledMenuContainer>
                     </Collapse>
                  ))}
               </TransitionGroup>
            </BaseMenu>
         )}
      </>
   )
}

export default NotificationsMenu
