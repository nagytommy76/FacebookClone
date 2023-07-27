import React from 'react'
import Image from 'next/image'
import type { LikeTypes } from '@/src/types/LikeTypes'

import LikeAnimated from '@/assets/likeAnimated.svg'
import Love from '@/assets/love.svg'
import Care from '@/assets/care.svg'
import Haha from '@/assets/haha.svg'
import Wow from '@/assets/wow.svg'
import Sad from '@/assets/sad.svg'
import Angry from '@/assets/angry.svg'

const useIcon = () => {
   const returnImage = (reactionType: LikeTypes) => {
      switch (reactionType) {
         case 'isAngry':
            return <Image src={Angry} alt='angry icon' />
         case 'isCare':
            return <Image src={Care} alt='angry icon' />
         case 'isHaha':
            return <Image src={Haha} alt='angry icon' />
         case 'isLike':
            return <Image src={LikeAnimated} alt='angry icon' />
         case 'isLove':
            return <Image src={Love} alt='angry icon' />
         case 'isSad':
            return <Image src={Sad} alt='angry icon' />
         case 'isWow':
            return <Image src={Wow} alt='angry icon' />
      }
   }

   return returnImage
}

export default useIcon
