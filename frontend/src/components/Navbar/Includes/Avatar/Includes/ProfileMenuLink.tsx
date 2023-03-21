import Link from 'next/link'
import { useAppSelector } from '../../../../../utils/redux/store'

import ImageAvatar from './ImageAvatar'

import MenuItem from '@mui/material/MenuItem'

const ProfileMenuLink: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
   const userName = useAppSelector((state) => state.auth.userName)
   return (
      <Link href='/me'>
         <MenuItem onClick={handleClose}>
            <ImageAvatar displayText={userName} />
         </MenuItem>
      </Link>
   )
}

export default ProfileMenuLink
