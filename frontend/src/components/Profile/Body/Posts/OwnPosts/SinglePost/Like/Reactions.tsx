import Image from 'next/image'
import Paper from '@mui/material/Paper'

import LikeSVG from '../../../../../../../assets/like.svg'
import Love from '../../../../../../../assets/love.svg'
import Care from '../../../../../../../assets/care.svg'
import Haha from '../../../../../../../assets/haha.svg'
import Wow from '../../../../../../../assets/wow.svg'
import Sad from '../../../../../../../assets/sad.svg'
import Angry from '../../../../../../../assets/angry.svg'

const Reactions = () => {
   return (
      <Paper>
         <Image src={LikeSVG} alt='like' width={40} height={40} />
         <Image src={Love} alt='like' width={40} height={40} />
         <Image src={Care} alt='like' width={40} height={40} />
         <Image src={Haha} alt='like' width={40} height={40} />
         <Image src={Wow} alt='like' width={40} height={40} />
         <Image src={Sad} alt='like' width={40} height={40} />
         <Image src={Angry} alt='like' width={40} height={40} />
      </Paper>
   )
}

export default Reactions
