import { useEffect, useState } from 'react'
import { socket } from '@/src/utils/socketIo'

import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import NotificationsMenu from './NotificationsMenu/NotificationsMenu'

const Notification = () => {
   const [notifications, setNotifications] = useState<{ postData: { description: string } }[]>([])

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
   }

   useEffect(() => {
      function onNotifications(inObject: any) {
         setNotifications(inObject)
      }

      // Ez azért kell mert ki van kapcsolva az automata connect: autoConnect
      socket.connect()
      socket.on('connect', () => {
         // Ezzel küldök adatot a szerver felé
         // socket.emit('add-message', { person: { age: 1245, name: 'Pista' } })

         // Ezzel fogadok adatokat a szerverről, az 1. paraméter a neve
         socket.on('notifications', onNotifications)
         socket.on('likedPost', (args) => {
            setNotifications(args)
            console.log(args)
         })
      })

      return () => {
         socket.off('notifications', onNotifications)
      }
   }, [])

   return (
      <>
         <Tooltip title='Értesítések' placement='bottom'>
            <IconButton onClick={handleClick} aria-label='notification' size='large'>
               <Badge badgeContent={notifications.length} color='error'>
                  <NotificationsIcon fontSize='inherit' />
               </Badge>
            </IconButton>
         </Tooltip>
         <NotificationsMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleClick={handleClick}
            notifications={notifications}
         />
      </>
   )
}

export default Notification
