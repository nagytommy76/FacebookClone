import { useEffect, useState } from 'react'
import { socket } from '@/src/utils/socketIo'
import { useAppSelector } from '@/src/utils/redux/store'
import type { NotificationType } from './Types'

import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import NotificationsMenu from './NotificationsMenu/NotificationsMenu'

const Notification = () => {
   const [notifications, setNotifications] = useState<NotificationType[]>([])
   const userId = useAppSelector((state) => state.auth.userId)
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

   useEffect(() => {
      function onNotifications(inObject: NotificationType[]) {
         console.log(inObject)
         setNotifications(inObject)
      }

      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      socket.connect()
      socket.on('connect', () => {
         socket.emit('newUser', userId)
         // Ezzel küldök adatot a szerver felé
         // socket.emit('add-message', { person: { age: 1245, name: 'Pista' } })

         // Ezzel fogadok adatokat a szerverről, az 1. paraméter a neve
         socket.on('notifications', onNotifications)
         socket.on('likedPost', (args) => {
            console.log(args)
            setNotifications(args)
         })
      })

      return () => {
         socket.off('notifications', onNotifications)
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
               <Badge badgeContent={notifications.length} color='error'>
                  <NotificationsIcon fontSize='inherit' />
               </Badge>
            </IconButton>
         </Tooltip>
         <NotificationsMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} notifications={notifications} />
      </>
   )
}

export default Notification
