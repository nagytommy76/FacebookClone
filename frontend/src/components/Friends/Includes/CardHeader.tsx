import Link from 'next/link'
import Image from 'next/image'

import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'

const CardHeader: React.FC<{ profilePicture: string; userId: string }> = ({ profilePicture, userId }) => {
   return (
      <Link href={`/me/${userId}`}>
         <CardActionArea>
            <CardContent sx={{ padding: 0 }}>
               <Image
                  style={{ objectFit: 'cover' }}
                  src={profilePicture}
                  alt={`Profile image`}
                  width={300}
                  height={200}
               />
            </CardContent>
         </CardActionArea>
      </Link>
   )
}

export default CardHeader
