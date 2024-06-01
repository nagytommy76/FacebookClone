import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import type { LikeTypes } from '@/types/LikeTypes'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import LikeAnimated from '@/assets/likeAnimated.svg'
import Love from '@/assets/love.svg'
import Care from '@/assets/care.svg'
import Haha from '@/assets/haha.svg'
import Wow from '@/assets/wow.svg'
import Sad from '@/assets/sad.svg'
import Angry from '@/assets/angry.svg'
/**
 * Megoldnai, hogy a commenteknél mutassa mondjuk a top első 3 like típusát (ikonban: isLike, isAngry stb...)
 * illetve a tetszik gomb olyan színű legyen amire én nyomtam, nem a top like színe mint most.
 * A post likeoknál is ezt hasonlóan kéne megoldnai, szóval mind2 esetben ugyan ez a funkció lenne
 *
 */
const buttonColor = {
   isLike: '#2073e8',
   isLove: '#ec3d56',
   isCare: '#e8a725',
   isHaha: '#e8a725',
   isWow: '#e8a725',
   isSad: '#e8a725',
   isAngry: '#e9710f',
}
const useButtonColor = () => {
   const [likeButtonColor, setLikeButtonColor] = useState('')
   const [likeBtnIcon, setLikeBtnIcon] = useState(<ThumbUpOffAltIcon />)
   const [likeBtnText, setLikeBtnText] = useState<
      'Tetszik' | 'Imádom' | 'Ölelés' | 'Vicces' | 'Hűha' | 'Szomorú' | 'Dühítő'
   >('Tetszik')

   const setButtonColor = useCallback((currentLikeType: LikeTypes | undefined) => {
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
   }, [])
   return {
      likeButtonColor,
      likeBtnIcon,
      likeBtnText,
      setButtonColor,
   }
}

export default useButtonColor
