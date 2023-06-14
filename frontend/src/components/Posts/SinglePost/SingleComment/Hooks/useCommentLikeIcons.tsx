import React from 'react'
import Image from 'next/image'
import type { LikeTypes } from '../../Like/Types'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import LikeAnimated from '../../../../../assets/like.svg'
import Love from '../../../../../assets/love.svg'
import Care from '../../../../../assets/care.svg'
import Haha from '../../../../../assets/haha.svg'
import Wow from '../../../../../assets/wow.svg'
import Sad from '../../../../../assets/sad.svg'
import Angry from '../../../../../assets/angry.svg'

const useCommentLikeIcons = () => {
   const getLikeIconComponent = (currentLikeType: LikeTypes | string) => {
      switch (currentLikeType) {
         case 'isLike':
            return <Image priority src={LikeAnimated} alt='like icon' />
         case 'isLove':
            return <Image priority src={Love} alt='love icon' />
         case 'isCare':
            return <Image priority src={Care} alt='care icon' />
         case 'isHaha':
            return <Image priority src={Haha} alt='haha icon' />
         case 'isWow':
            return <Image priority src={Wow} alt='wow icon' />
         case 'isSad':
            return <Image priority src={Sad} alt='sad icon' />
         case 'isAngry':
            return <Image priority src={Angry} alt='angry icon' />
         default:
            return <ThumbUpOffAltIcon />
      }
   }

   return getLikeIconComponent
}

export default useCommentLikeIcons
