import Image from 'next/image'

import Avatar from '@mui/material/Avatar'

import OwnProfile from '../../../../../../public/sajat.jpg'

const ImageAvatar: React.FC<{ displayText?: string }> = ({ displayText }) => {
   return (
      <>
         <Avatar sx={{ bgcolor: 'orange', width: 45, height: 45 }}>
            <Image width={45} height={45} alt='Profile picture' src={OwnProfile} />
         </Avatar>
         <p>{displayText}</p>
      </>
   )
}

export default ImageAvatar
