import { useState } from 'react'

const useLikeBtnColor = () => {
   const buttonColor = {
      isLike: '#2073e8',
      isLove: '#ec3d56',
      isCare: '#e8a725',
      isHaha: '#e8a725',
      isWow: '#e8a725',
      isSad: '#e8a725',
      isAngry: '#e9710f',
   }
   const [likeButtonColor, setLikeButtonColor] = useState('')
   return { buttonColor, likeButtonColor, setLikeButtonColor }
}

export default useLikeBtnColor
