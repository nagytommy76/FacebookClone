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
   const returnImage = (reactionType: LikeTypes | 'all', width: number = 25, height: number = 25) => {
      switch (reactionType) {
         case 'isAngry':
            return <Image width={width} height={height} src={Angry} alt='angry icon' />
         case 'isCare':
            return <Image width={width} height={height} src={Care} alt='care icon' />
         case 'isHaha':
            return <Image width={width} height={height} src={Haha} alt='haha icon' />
         case 'isLike':
            return <Image width={width} height={height} src={LikeAnimated} alt='like icon' />
         case 'isLove':
            return <Image width={width} height={height} src={Love} alt='love icon' />
         case 'isSad':
            return <Image width={width} height={height} src={Sad} alt='sad icon' />
         case 'isWow':
            return <Image width={width} height={height} src={Wow} alt='wow icon' />
      }
   }

   return returnImage
}

export default useIcon
