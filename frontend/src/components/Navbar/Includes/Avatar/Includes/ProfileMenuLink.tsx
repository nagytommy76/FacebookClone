import Link from 'next/link'
import { useAppSelector } from '@/reduxStore/store'

import ImageAvatar from './ImageAvatar'

import MenuItem from '@mui/material/MenuItem'

const ProfileMenuLink: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
   const { userId, userName } = useAppSelector((state) => state.auth)
   return (
      <Link href={`/me/${userId}`}>
         <MenuItem onClick={handleClose}>
            <ImageAvatar displayText={userName} />
         </MenuItem>
      </Link>
   )
}

export default ProfileMenuLink
