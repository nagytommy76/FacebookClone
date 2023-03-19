import Image from 'next/image'

import Avatar from '@mui/material/Avatar'

import OwnProfile from '../../../../../../public/sajat.jpg'

const ImageAvatar = () => {
   return (
      <Avatar sx={{ bgcolor: 'orange', width: 45, height: 45 }}>
         <Image width={45} height={45} alt='Profile picture' src={OwnProfile} />
      </Avatar>
   )
}

export default ImageAvatar
