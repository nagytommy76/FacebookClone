import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import type { LikeTypes } from '@/types/LikeTypes'

import useLikeBtnColor from '@/hooks/Like/useLikeBtnColor'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import LikeAnimated from '@/assets/likeAnimated.svg'
import Love from '@/assets/love.svg'
import Care from '@/assets/care.svg'
import Haha from '@/assets/haha.svg'
import Wow from '@/assets/wow.svg'
import Sad from '@/assets/sad.svg'
import Angry from '@/assets/angry.svg'

const useButtonColor = () => {
   const { buttonColor, likeButtonColor, setLikeButtonColor } = useLikeBtnColor()
   const [likeBtnIcon, setLikeBtnIcon] = useState(<ThumbUpOffAltIcon />)
   const [likeBtnText, setLikeBtnText] = useState<
      'Tetszik' | 'Imádom' | 'Ölelés' | 'Vicces' | 'Hűha' | 'Szomorú' | 'Dühítő'
   >('Tetszik')

   const setButtonColor = useCallback(
      (currentLikeType: LikeTypes | undefined) => {
         switch (currentLikeType) {
            case 'isLike':
               setLikeButtonColor(buttonColor.isLike)
               setLikeBtnIcon(<Image src={LikeAnimated} alt='like icon' />)
               setLikeBtnText('Tetszik')
               break
            case 'isLove':
               setLikeButtonColor(buttonColor.isLove)
               setLikeBtnIcon(<Image src={Love} alt='love icon' />)
               setLikeBtnText('Imádom')
               break
            case 'isCare':
               setLikeButtonColor(buttonColor.isCare)
               setLikeBtnIcon(<Image src={Care} alt='care icon' />)
               setLikeBtnText('Ölelés')
               break
            case 'isHaha':
               setLikeButtonColor(buttonColor.isHaha)
               setLikeBtnIcon(<Image src={Haha} alt='haha icon' />)
               setLikeBtnText('Vicces')
               break
            case 'isWow':
               setLikeButtonColor(buttonColor.isWow)
               setLikeBtnIcon(<Image src={Wow} alt='wow icon' />)
               setLikeBtnText('Hűha')
               break
            case 'isSad':
               setLikeButtonColor(buttonColor.isSad)
               setLikeBtnIcon(<Image src={Sad} alt='sad icon' />)
               setLikeBtnText('Szomorú')
               break
            case 'isAngry':
               setLikeButtonColor(buttonColor.isAngry)
               setLikeBtnIcon(<Image src={Angry} alt='angry icon' />)
               setLikeBtnText('Dühítő')
               break
            default:
               setLikeButtonColor('')
               setLikeBtnIcon(<ThumbUpOffAltIcon />)
               setLikeBtnText('Tetszik')
               break
         }
      },
      [
         buttonColor.isLike,
         buttonColor.isLove,
         buttonColor.isCare,
         buttonColor.isHaha,
         buttonColor.isWow,
         buttonColor.isSad,
         buttonColor.isAngry,
         setLikeButtonColor,
      ]
   )

   return {
      likeButtonColor,
      likeBtnIcon,
      likeBtnText,
      setButtonColor,
   }
}

export default useButtonColor
