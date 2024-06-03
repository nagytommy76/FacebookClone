import React from 'react'
import Image from 'next/image'
import type { LikeTypes } from '@/types/LikeTypes'

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import LikeAnimated from '@/assets/likeAnimated.svg'
import Love from '@/assets/love.svg'
import Care from '@/assets/care.svg'
import Haha from '@/assets/haha.svg'
import Wow from '@/assets/wow.svg'
import Sad from '@/assets/sad.svg'
import Angry from '@/assets/angry.svg'

const ReactionIcon: React.FC<{ likeType: LikeTypes | undefined }> = ({ likeType }) => {
   switch (likeType) {
      case 'isLike':
         return <Image width={18} height={18} src={LikeAnimated} alt='like icon' />
      case 'isLove':
         return <Image width={18} height={18} src={Love} alt='love icon' />
      case 'isCare':
         return <Image width={18} height={18} src={Care} alt='care icon' />
      case 'isHaha':
         return <Image width={18} height={18} src={Haha} alt='haha icon' />
      case 'isWow':
         return <Image width={18} height={18} src={Wow} alt='wow icon' />
      case 'isSad':
         return <Image width={18} height={18} src={Sad} alt='sad icon' />
      case 'isAngry':
         return <Image width={18} height={18} src={Angry} alt='angry icon' />
      default:
         return <SentimentVerySatisfiedIcon fontSize='inherit' />
   }
}

export default ReactionIcon
