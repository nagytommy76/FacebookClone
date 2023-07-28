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
            return <Image width={25} height={25} src={Angry} alt='angry icon' />
         case 'isCare':
            return <Image width={25} height={25} src={Care} alt='angry icon' />
         case 'isHaha':
            return <Image width={25} height={25} src={Haha} alt='angry icon' />
         case 'isLike':
            return <Image width={25} height={25} src={LikeAnimated} alt='angry icon' />
         case 'isLove':
            return <Image width={25} height={25} src={Love} alt='angry icon' />
         case 'isSad':
            return <Image width={25} height={25} src={Sad} alt='angry icon' />
         case 'isWow':
            return <Image width={25} height={25} src={Wow} alt='angry icon' />
      }
   }

   return returnImage
}

export default useIcon
