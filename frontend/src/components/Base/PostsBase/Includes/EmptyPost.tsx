import Image from 'next/image'
import Folder from '@/assets/folder.png'
import { EmptyContainer } from '../Styles'

import Typography from '@mui/material/Typography'

const EmptyPost = () => {
   return (
      <EmptyContainer>
         <Typography variant='h2' fontWeight={400}>
            Nem található poszt! ☹️
         </Typography>
         <Image alt='No data was found' src={Folder} width={350} height={350} />
      </EmptyContainer>
   )
}

export default EmptyPost
