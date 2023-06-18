import { StyledPaperContainer, StyledImage } from './Styles'
import Tooltip from '@mui/material/Tooltip'

import LikeAnimated from '@/assets/likeAnimated.svg'
import Love from '@/assets/love.svg'
import Care from '@/assets/care.svg'
import Haha from '@/assets/haha.svg'
import Wow from '@/assets/wow.svg'
import Sad from '@/assets/sad.svg'
import Angry from '@/assets/angry.svg'
import type { LikeTypes } from '@/types/LikeTypes'

const Reactions: React.FC<{ setLike: (likeType: LikeTypes) => void }> = ({ setLike }) => {
   return (
      <StyledPaperContainer>
         <Tooltip title='Tetszik' placement='top' enterDelay={50}>
            <StyledImage
               onClick={() => setLike('isLike')}
               src={LikeAnimated}
               alt='like'
               width={40}
               height={40}
            />
         </Tooltip>
         <Tooltip title='Imádom' placement='top' enterDelay={50}>
            <StyledImage onClick={() => setLike('isLove')} src={Love} alt='love' width={40} height={40} />
         </Tooltip>
         <Tooltip title='Ölelés' placement='top' enterDelay={50}>
            <StyledImage onClick={() => setLike('isCare')} src={Care} alt='care' width={40} height={40} />
         </Tooltip>
         <Tooltip title='Vicces' placement='top' enterDelay={50}>
            <StyledImage onClick={() => setLike('isHaha')} src={Haha} alt='haha' width={40} height={40} />
         </Tooltip>
         <Tooltip title='Hűha' placement='top' enterDelay={50}>
            <StyledImage onClick={() => setLike('isWow')} src={Wow} alt='wow' width={40} height={40} />
         </Tooltip>
         <Tooltip title='Szomorú' placement='top' enterDelay={50}>
            <StyledImage onClick={() => setLike('isSad')} src={Sad} alt='sad' width={40} height={40} />
         </Tooltip>
         <Tooltip title='Dühítő' placement='top' enterDelay={50}>
            <StyledImage onClick={() => setLike('isAngry')} src={Angry} alt='angry' width={40} height={40} />
         </Tooltip>
      </StyledPaperContainer>
   )
}

export default Reactions
