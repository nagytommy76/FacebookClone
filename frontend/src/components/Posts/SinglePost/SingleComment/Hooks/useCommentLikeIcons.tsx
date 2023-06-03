import React from 'react'
import Image from 'next/image'
import type { LikeTypes } from '../../Like/Types'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import LikeAnimated from '../../../../../assets/likeAnimated.svg'
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
            return <Image src={LikeAnimated} alt='like icon' />
         case 'isLove':
            return <Image src={Love} alt='love icon' />
         case 'isCare':
            return <Image src={Care} alt='care icon' />
         case 'isHaha':
            return <Image src={Haha} alt='haha icon' />
         case 'isWow':
            return <Image src={Wow} alt='wow icon' />
         case 'isSad':
            return <Image src={Sad} alt='sad icon' />
         case 'isAngry':
            return <Image src={Angry} alt='angry icon' />
         default:
            return <ThumbUpOffAltIcon />
      }
   }

   return getLikeIconComponent
}

export default useCommentLikeIcons
