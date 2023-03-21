import Link from 'next/link'
import { useAppSelector } from '../../../../../utils/redux/store'
import styled from '@emotion/styled'

import ImageAvatar from './ImageAvatar'

import MenuItem from '@mui/material/MenuItem'

const ProfileMenuLink: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
   const userName = useAppSelector((state) => state.auth.userName)
   return (
      <StyledLink href='/me'>
         <MenuItem onClick={handleClose}>
            <ImageAvatar displayText={userName} />
         </MenuItem>
      </StyledLink>
   )
}

export default ProfileMenuLink

const StyledLink = styled(Link)({
   marginBottom: 12,
})
