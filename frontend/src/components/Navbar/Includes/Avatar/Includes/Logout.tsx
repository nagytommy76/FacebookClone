import useLogout from '../../../../../hooks/useLogout'

import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'

const LogoutItem: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
   const logout = useLogout()
   const handleLogoutAndClose = async () => {
      await logout()
      handleClose()
   }

   return (
      <MenuItem onClick={handleLogoutAndClose}>
         <ListItemIcon>
            <Logout />
         </ListItemIcon>
         Kilépés
      </MenuItem>
   )
}

export default LogoutItem
