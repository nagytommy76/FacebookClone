import { useEffect, useState } from 'react'
import { socket } from '@/src/utils/socketIo'
import { useAppSelector } from '@/src/utils/redux/store'
import type { NotificationType } from './Types'

import useGetNotifications from './Hooks/useGetNotifications'

import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import NotificationsMenu from './NotificationsMenu/NotificationsMenu'

const Notification = () => {
   const [notifications, setNotifications] = useState<NotificationType[] | null>(null)
   const userId = useAppSelector((state) => state.auth.userId)
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   useGetNotifications(setNotifications)

   useEffect(() => {
      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      socket.connect()
      socket.on('connect', () => {
         socket.emit('newUser', userId)

         socket.on('likedPost', (args) => {
            setNotifications(args)
         })
         socket.on('addComment', (args) => {
            console.log(args)
            setNotifications(args)
         })
      })
      console.log(notifications)
      return () => {
         socket.off('likedPost')
         socket.off('addComment')
         socket.disconnect()
      }
   }, [userId])

   return (
      <>
         <Tooltip title='Értesítések' placement='bottom'>
            <IconButton
               onClick={(event) => setAnchorEl(event.currentTarget)}
               aria-label='notification'
               size='large'
            >
               <Badge badgeContent={notifications?.length} color='error'>
                  <NotificationsIcon fontSize='inherit' />
               </Badge>
            </IconButton>
         </Tooltip>
         {notifications !== null && (
            <NotificationsMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} notifications={notifications} />
         )}
      </>
   )
}

export default Notification
